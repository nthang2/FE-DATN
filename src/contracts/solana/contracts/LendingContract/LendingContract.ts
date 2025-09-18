/* eslint-disable @typescript-eslint/no-explicit-any */
import { BN } from '@coral-xyz/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  getMint,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { WalletContextState } from '@solana/wallet-adapter-react';
import {
  AddressLookupTableAccount,
  ComputeBudgetProgram,
  PublicKey,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import { toast } from 'react-toastify';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { findTokenInfoByToken, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { solanaDevnet } from 'src/constants/tokens/solana-ecosystem/solana-devnet';
import { solTokenSolana } from 'src/constants/tokens/solana-ecosystem/solana-mainnet';
import { queryClient } from 'src/layout/Layout';
import { TokenName } from 'src/libs/crypto-icons';
import { getJupiterQuote, jupiterSwapInstructions } from 'src/services/HandleApi/getJupiterInfo/getJupiterInfo';
import { publicClientSol } from 'src/states/hooks';
import { appStore, crossModeAtom } from 'src/states/state';
import { getDecimalToken } from 'src/utils';
import { BN as utilBN } from 'src/utils/index';
import { addPriorityFee, getAddressLookupTableAccounts } from 'src/views/MyPortfolio/utils';
import { pad } from 'viem';
import { IdlLending, idlLending } from '../../idl/lending/lending';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { usdaiAddress } from '../VaultContract';
import {
  CONTROLLER_SEED,
  collateral as defaultCollateral,
  defaultSlippageBps,
  DEPOSITORY_SEED,
  jupiterProgram,
  listTokenSwapWithJup,
  LOAN_TYPE0_SEED,
  REDEEM_CONFIG,
  REDEEMABLE_MINT_SEED,
  RESERVE_ACCOUNT,
  SWAP_CONFIG_SEED,
  swapUsdcALT,
  WALLET_LINKING_REQUEST_SEED,
} from './constant';

export class LendingContract extends SolanaContractAbstract<IdlLending> {
  constructor(wallet: WalletContextState) {
    super(wallet as any, ctrAdsSolana.lending, idlLending);
  }

  private async _getOrCreateTokenAccountTx(mint: PublicKey, payer: PublicKey): Promise<Transaction> {
    const tokenAccount = getAssociatedTokenAddressSync(mint, payer, true);
    const transaction: Transaction = new Transaction();

    try {
      await getAccount(this.provider.connection, tokenAccount, 'confirmed');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      transaction.add(
        createAssociatedTokenAccountInstruction(payer, tokenAccount, payer, mint, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID)
      );
    }

    return transaction;
  }

  getAccountsPartial(tokenAddress: string) {
    const redeemable_mint = this.getPda(REDEEMABLE_MINT_SEED);
    const collateral = new PublicKey(tokenAddress);
    const usdai = new PublicKey(usdaiAddress);
    const userCollateralATA = getAssociatedTokenAddressSync(collateral, this.provider.publicKey);
    const userRedeemATA = getAssociatedTokenAddressSync(redeemable_mint, this.provider.publicKey);
    const { pdAddress } = this.getUserLoanByToken(this.provider.publicKey, collateral);
    const controller = this.getPda(CONTROLLER_SEED);
    const depository = this.getPda(DEPOSITORY_SEED, collateral);
    const depositoryVault = getAssociatedTokenAddressSync(collateral, depository, true);
    const redeemConfig = this.getPda(REDEEM_CONFIG);
    const swapConfig = this.getPda(SWAP_CONFIG_SEED);
    const usdaiUserAta = getAssociatedTokenAddressSync(usdai, this.provider.publicKey, true);
    const reserveTokenAccount = getAssociatedTokenAddressSync(redeemable_mint, RESERVE_ACCOUNT, true);
    const stablecoinReserveAta = getAssociatedTokenAddressSync(collateral, RESERVE_ACCOUNT, true);
    const usdaiReserveAta = getAssociatedTokenAddressSync(usdai, RESERVE_ACCOUNT, true);

    return {
      user: this.provider.publicKey,
      collateral: collateral,
      userCollateral: userCollateralATA,
      redeemableMint: redeemable_mint,
      userRedeemable: userRedeemATA,
      controller: controller,
      depository: depository,
      depositoryVault: depositoryVault,
      oracle: ctrAdsSolana.oracle,
      loanAccount: pdAddress,
      reserve: RESERVE_ACCOUNT,
      reserveTokenAccount: reserveTokenAccount,
      redeemConfig: redeemConfig,
      swapConfig: swapConfig,
      usdaiUserAta: usdaiUserAta,
      stablecoinReserveAta: stablecoinReserveAta,
      usdaiReserveAta: usdaiReserveAta,
    };
  }

  getUserLoanByToken(user: PublicKey, token: PublicKey) {
    const depositoryPda = this.getPda(DEPOSITORY_SEED, token);
    const pdAddress = this.getPda(LOAN_TYPE0_SEED, depositoryPda, user);

    return { pdAddress, depositoryPda };
  }

  async getAccountType0Depository(address: PublicKey) {
    return await queryClient.ensureQueryData({
      queryKey: ['AccountType0Depository', address],
      queryFn: async () => await this.program.account.type0Depository.fetch(address),
      staleTime: 1000 * 60,
    });
  }

  async getLoanType0(userLoanPDAAddress: PublicKey) {
    return await this.program.account.loanType0.fetch(userLoanPDAAddress);
  }

  async getDepositoryVault(tokenAddress: string) {
    const { depositoryVault } = this.getAccountsPartial(tokenAddress);
    const depository = await getAccount(this.provider.connection, depositoryVault);

    return depository;
  }

  async getLoan(tokenAddress: string) {
    const depositoryPda = this.getPda(DEPOSITORY_SEED, new PublicKey(tokenAddress));
    const loanPda = this.getPda(LOAN_TYPE0_SEED, depositoryPda, this.provider.publicKey);
    const loan = await this.program.account.loanType0.fetch(loanPda);

    //This variable only use for cross mode we declare here just for sync interface getLoan return type
    const listAvailableCollateral = [tokenAddress];

    return { ...loan, listAvailableCollateral };
  }

  async initialize(): Promise<string> {
    return '';
  }

  async deposit(depositAmount: number, tokenAddress: string): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(depositAmount * decimal);
    const usdaiAmount = new BN(0 * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);
    const transaction = await this._getOrCreateTokenAccountTx(new PublicKey(tokenAddress), this.provider.publicKey);

    if (tokenAddress === (solTokenSolana.address || solanaDevnet.address)) {
      transaction.add(this.wrapSol(tokenAddress, collateralAmount));
    }

    const depositTransaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, true, false)
      .accountsPartial(accountsPartial)
      .transaction();
    transaction.add(depositTransaction);

    const transactionHash = await this.sendTransaction(transaction);
    await queryClient.invalidateQueries({ queryKey: ['useMyPortfolio', this.provider.publicKey, appStore.get(crossModeAtom)] });
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async borrow(borrowAmount: number, tokenAddress: string, isMax?: boolean): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(0 * decimal);
    const maxAmount = utilBN(2).pow(64).minus(1);
    const usdaiAmount = isMax ? new BN(maxAmount.toString()) : new BN(borrowAmount * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);
    const isHasUserCollateral1 = await this.checkUserCollateral(new PublicKey(tokenAddress));
    const resultTransaction = new Transaction();

    if (isHasUserCollateral1 !== null) {
      resultTransaction.add(isHasUserCollateral1);
    }

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, false, true)
      .accountsPartial(accountsPartial)
      .transaction();
    resultTransaction.add(transaction);

    const transactionHash = await this.sendTransaction(resultTransaction);
    await queryClient.invalidateQueries({ queryKey: ['useMyPortfolio', this.provider.publicKey, appStore.get(crossModeAtom)] });
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async repay(debtAmount: number, tokenAddress: string, isMax?: boolean): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(0 * decimal);
    const maxAmount = utilBN(2).pow(64).minus(1);
    const usdaiAmount = isMax ? new BN(maxAmount.toString()) : new BN(debtAmount * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);
    const isHasUserCollateral1 = await this.checkUserCollateral(new PublicKey(tokenAddress));
    const resultTransaction = new Transaction();

    if (isHasUserCollateral1 !== null) {
      resultTransaction.add(isHasUserCollateral1);
    }

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, false, false)
      .accountsPartial(accountsPartial)
      .transaction();
    resultTransaction.add(transaction);

    const transactionHash = await this.sendTransaction(resultTransaction);
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async withdraw(depositAmount: number, tokenAddress: string): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(depositAmount * decimal);
    const usdaiAmount = new BN(0 * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);
    const isHasUserCollateral1 = await this.checkUserCollateral(new PublicKey(tokenAddress));
    const resultTransaction = new Transaction();

    if (isHasUserCollateral1 !== null) {
      resultTransaction.add(isHasUserCollateral1);
    }

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, false, false)
      .accountsPartial(accountsPartial)
      .transaction();
    resultTransaction.add(transaction);

    if (tokenAddress === (solTokenSolana.address || solanaDevnet.address)) {
      resultTransaction.add(await this.unwrapSol());
    }

    const transactionHash = await this.sendTransaction(resultTransaction);
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async getMaxLtv(address = defaultCollateral, decimal = 1e9): Promise<number> {
    const { depositoryPda } = this.getUserLoanByToken(this.provider.publicKey, address);
    const ratio = (await this.getAccountType0Depository(depositoryPda)).collateralizationRatio;
    const result = decimal / ratio.toNumber();

    return result;
  }

  async getBorrowRate(address = defaultCollateral, decimal = 1e12): Promise<number> {
    const { depositoryPda } = this.getUserLoanByToken(this.provider.publicKey, address);
    const rate = (await this.getAccountType0Depository(depositoryPda)).rate;
    const result = rate.toNumber() / decimal;

    return result;
  }

  async checkIfPdaExist(address: PublicKey) {
    try {
      const account = await publicClientSol().getAccountInfo(address, undefined);
      return account;
    } catch (e: unknown) {
      console.log(e, address.toString());
      toast.error('Loading connection fail');
      throw e;
    }
  }

  //Collateral Type 0 in Isolated Mode
  async redeemByCollateral(params: {
    collateralAmountRaw: string;
    selectedToken: string;
    resultSwapInstructions: any;
    priorityFee: number;
  }) {
    const { collateralAmountRaw, selectedToken, resultSwapInstructions, priorityFee } = params;

    const dataSwap = Buffer.from(resultSwapInstructions.swapInstruction.data, 'base64');

    const remainingAccounts = resultSwapInstructions.swapInstruction.accounts.map(
      (acc: { pubkey: any; isSigner: any; isWritable: any }) => {
        const pubkeyStr = acc.pubkey;
        const isUser = pubkeyStr === this.provider.publicKey.toString();
        return {
          pubkey: new PublicKey(pubkeyStr),
          isSigner: acc.isSigner || isUser, // Mark as signer if it's the user
          isWritable: acc.isWritable,
        };
      }
    );

    const redeemCollInsType0 = await this.getRedeemByCollateralInstruction(selectedToken, collateralAmountRaw, remainingAccounts, dataSwap);

    const addressLookupTableAccounts: AddressLookupTableAccount[] = [];
    addressLookupTableAccounts.push(...(await getAddressLookupTableAccounts(resultSwapInstructions.addressLookupTableAddresses)));

    const instruction = [ComputeBudgetProgram.setComputeUnitLimit({ units: 1400000 }), addPriorityFee(priorityFee), redeemCollInsType0];
    const blockhash = (await this.provider.connection.getLatestBlockhash('finalized')).blockhash;
    const isHasUserCollateral1 = await this.checkUserCollateral(new PublicKey(selectedToken));

    if (isHasUserCollateral1 !== null) {
      instruction.unshift(isHasUserCollateral1);
    }

    const messageV0 = new TransactionMessage({
      payerKey: this.provider.publicKey,
      recentBlockhash: blockhash,
      instructions: instruction,
    }).compileToV0Message(addressLookupTableAccounts);

    const transaction = new VersionedTransaction(messageV0);
    const txHash = await this.sendTransaction(transaction, undefined, true);

    return txHash;
  }

  async getRedeemByCollateralInstruction(tokenMintAddress: string, amountCollateral: string, remainingAccounts: any, data: any) {
    try {
      const accountsPartial = this.getAccountsPartial(tokenMintAddress);

      const ix = await this.program.methods
        .type0RedeemByCollateral(new BN(amountCollateral), data)
        .accountsPartial({
          ...accountsPartial,
          jupiterProgram: jupiterProgram,
        })
        .remainingAccounts(remainingAccounts)
        .instruction();

      return ix;
    } catch (error) {
      console.error('❌ Error get ins redeem config:', error);
      throw error;
    }
  }

  async swapToken(tokenAddress: string, amount: number, isReverse: boolean) {
    const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
    const listInstruction = [];
    const isHasUserCollateral1 = await this.checkUserCollateral(new PublicKey(tokenAddress));
    const isHasUserUsdaiAccount = await this.checkUserCollateral(new PublicKey(usdaiInfo.address));

    if (isHasUserCollateral1 !== null) {
      listInstruction.push(isHasUserCollateral1);
    }

    if (isHasUserUsdaiAccount !== null) {
      listInstruction.push(isHasUserUsdaiAccount);
    }

    const { instruction, addressLookupTable } = await this.getSwapTokenInstruction(tokenAddress, amount, isReverse);

    const messageV0 = new TransactionMessage({
      payerKey: this.provider.publicKey,
      recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
      instructions: [...listInstruction, ...instruction],
    }).compileToV0Message(addressLookupTable);
    const transaction = new VersionedTransaction(messageV0);

    const transactionHash = await this.sendTransaction(transaction);

    return transactionHash;
  }

  async getSwapConfig() {
    const swapConfig = this.getPda(SWAP_CONFIG_SEED);
    const swapConfigData = await this.program.account.swapUsdaiConfig.fetch(swapConfig);

    return swapConfigData;
  }

  async getTotalSupply() {
    const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
    const mintInfo = await getMint(this.provider.connection, new PublicKey(usdaiInfo.address));
    const totalSupply = utilBN(mintInfo.supply).div(utilBN(10).pow(utilBN(usdaiInfo.decimals)));

    return totalSupply.toNumber();
  }

  async getSwapTokenInstruction(tokenAddress: string, amount: number | string, isReverse: boolean, amountAfterFee: number | string = 0) {
    const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
    const selectedTokenInfo = findTokenInfoByToken(tokenAddress);
    const lookupTableAccount = await this.provider.connection.getAddressLookupTable(new PublicKey(swapUsdcALT));
    const instruction: TransactionInstruction[] = [];
    const addressLookupTable: AddressLookupTableAccount[] = lookupTableAccount.value ? [lookupTableAccount.value] : [];
    let tokenSwapToUsdai = tokenAddress;
    //this is only for jupiter
    let outAmount = null;

    if (!selectedTokenInfo) {
      throw new Error('Token not found');
    }

    const amountRaw = new BN(
      utilBN(amount)
        .multipliedBy(utilBN(10).pow(utilBN(isReverse ? selectedTokenInfo.decimals : usdaiInfo.decimals)))
        .toNumber()
    );

    try {
      if (listTokenSwapWithJup.includes(selectedTokenInfo.address)) {
        const amountWithDecimal = utilBN(amountAfterFee ? amountAfterFee : amount).multipliedBy(
          utilBN(10).pow(utilBN(selectedTokenInfo.decimals))
        );
        const usdcInfo = mapNameToInfoSolana[TokenName.USDC];
        const { swapInstructions, addressLookupTableAccounts, outAmountJupiter } = await this.getSwapJupiterInstruction(
          selectedTokenInfo.address,
          isReverse,
          amountWithDecimal.toFixed(0),
          defaultSlippageBps
        );

        addressLookupTable.push(...addressLookupTableAccounts);
        instruction.push(...swapInstructions);
        //this scope is only for jupiter swap from selected token to usdc and now we make it convert usdc to usdai
        tokenSwapToUsdai = usdcInfo.address;
        outAmount = utilBN(outAmountJupiter)
          .div(utilBN(10).pow(utilBN(usdcInfo.decimals)))
          .toNumber();
      }

      const accountsPartial = this.getAccountsPartial(tokenSwapToUsdai);
      const swapToUsdaiInstruction = await this.program.methods
        .swapUsdaiType0(amountRaw, isReverse)
        .accountsPartial({
          ...accountsPartial,
          stablecoinDepository: accountsPartial.depository,
          stablecoinDepositoryVault: accountsPartial.depositoryVault,
          stablecoinUserAta: accountsPartial.userCollateral,
          usdai: new PublicKey(usdaiAddress),
          stablecoin: accountsPartial.collateral,
        })
        .instruction();

      if (!isReverse) {
        instruction.unshift(swapToUsdaiInstruction);
      } else {
        instruction.push(swapToUsdaiInstruction);
      }
    } catch (error) {
      console.error('❌ Error get ins swap token:', error);
      throw error;
    }

    return { instruction, addressLookupTable, outAmount: isReverse ? outAmount : amount };
  }

  async getSwapJupiterInstruction(selectedTokenAddress: string, isReverse: boolean, amount: string, slippageBps: number = 100) {
    const usdcInfo = mapNameToInfoSolana[TokenName.USDC];
    const jupiterQuote = await getJupiterQuote({
      inputMint: isReverse ? selectedTokenAddress : usdcInfo.address,
      outputMint: isReverse ? usdcInfo.address : selectedTokenAddress,
      amount,
      slippageBps,
      swapMode: isReverse ? 'ExactOut' : 'ExactIn',
      maxAccounts: 40,
    });
    const swapBody = {
      quoteResponse: jupiterQuote,
      userPublicKey: this.provider.publicKey.toString(),
      wrapAndUnwrapSol: true,
      includeLookupTableAddresses: true,
    };
    const instructions = await jupiterSwapInstructions(swapBody);
    const swapInstructions: TransactionInstruction[] = [];
    const {
      setupInstructions,
      swapInstruction: swapInstructionPayload,
      cleanupInstruction,
      addressLookupTableAddresses,
      computeBudgetInstructions,
    } = instructions;

    const deserializeInstruction = (instruction: any) => {
      return new TransactionInstruction({
        programId: new PublicKey(instruction.programId),
        keys: instruction.accounts.map((key: any) => ({
          pubkey: new PublicKey(key.pubkey),
          isSigner: key.isSigner,
          isWritable: key.isWritable,
        })),
        data: Buffer.from(instruction.data, 'base64'),
      });
    };

    if (computeBudgetInstructions && Array.isArray(computeBudgetInstructions)) {
      computeBudgetInstructions.forEach((ix: any) => {
        swapInstructions.push(deserializeInstruction(ix));
      });
    }

    if (Array.isArray(setupInstructions) && setupInstructions.length > 0) {
      setupInstructions.forEach((ix: any) => {
        swapInstructions.push(deserializeInstruction(ix));
      });
    }
    if (swapInstructionPayload) {
      swapInstructions.push(deserializeInstruction(swapInstructionPayload));
    }

    if (cleanupInstruction) {
      swapInstructions.push(deserializeInstruction(cleanupInstruction));
    }

    const addressLookupTableAccounts: AddressLookupTableAccount[] = [];
    addressLookupTableAccounts.push(...(await getAddressLookupTableAccounts(addressLookupTableAddresses)));

    return {
      swapInstructions,
      addressLookupTableAccounts,
      outAmountJupiter: jupiterQuote.outAmount,
    };
  }

  async linkWallet(destinationWallet: string, destinationChainId: string, action: boolean, sourceWallet: string) {
    const destinationWalletBytes = Array.from(Buffer.from(pad(destinationWallet as `0x${string}`, { size: 32 }).slice(2), 'hex'));

    const instruction = await this.program.methods
      .requestLinkWallet(destinationWalletBytes, Number(destinationChainId), action)
      .accounts({
        user: new PublicKey(sourceWallet),
      })
      .transaction();

    const transactionHash = await this.sendTransaction(instruction);
    return transactionHash;
  }

  async getLinkWalletInfo(sourceWallet: string) {
    const pda = this.getPda(WALLET_LINKING_REQUEST_SEED, new PublicKey(sourceWallet));
    const linkWalletInfo = await this.program.account.walletLinkingRequest.fetch(pda);

    return linkWalletInfo;
  }

  async removeUniversalWallet(wallet: string, chainId: number) {
    const destinationWalletBytes = Array.from(new PublicKey(wallet).toBytes());

    const instruction = await this.program.methods
      .requestLinkWallet(destinationWalletBytes, Number(chainId), false)
      .accounts({
        user: new PublicKey(wallet),
      })
      .transaction();

    const transactionHash = await this.sendTransaction(instruction);
    return transactionHash;
  }
}
