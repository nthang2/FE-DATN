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
import { IdlLending, idlLending } from '../../idl/lending/lending';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { usdaiAddress } from '../VaultContract';
import {
  CONTROLLER_SEED,
  CROSSCHAIN_CONFIG_SEED,
  CROSSCHAIN_DEPOSITORY_TYPE1_SEED,
  collateral as defaultCollateral,
  defaultSlippageBps,
  DEPOSITORY_TYPE1_SEED,
  jupiterProgram,
  listTokenSwapWithJup,
  LOAN_TYPE1_SEED,
  REDEEM_CONFIG,
  REDEEMABLE_MINT_SEED,
  RESERVE_ACCOUNT,
  SWAP_CONFIG_SEED,
  swapUsdcALT,
  WALLET_LINKING_REQUEST_SEED,
} from './constant';
import { mapChainIdToName } from 'src/constants/chainId';

export class LendingContractCrossNetwork extends SolanaContractAbstract<IdlLending> {
  constructor(wallet: WalletContextState) {
    super(wallet, ctrAdsSolana.lending, idlLending);
  }

  getAccountsPartial(tokenAddress: string) {
    const redeemable_mint = this.getPda(REDEEMABLE_MINT_SEED);
    const collateral = new PublicKey(tokenAddress);
    const userRedeemATA = getAssociatedTokenAddressSync(redeemable_mint, this.provider.publicKey);
    const { pdAddress } = this.getUserLoanByToken(this.provider.publicKey, collateral);
    const controller = this.getPda(CONTROLLER_SEED);
    const depository = this.getPda(DEPOSITORY_TYPE1_SEED);
    const depositoryVault = getAssociatedTokenAddressSync(collateral, depository, true);
    const reserveTokenAccount = getAssociatedTokenAddressSync(redeemable_mint, RESERVE_ACCOUNT, true);
    const collateral1 = new PublicKey(tokenAddress);
    const userCollateral1 = getAssociatedTokenAddressSync(new PublicKey(tokenAddress), this.provider.publicKey);
    const redeemConfig = this.getPda(REDEEM_CONFIG);
    const swapConfig = this.getPda(SWAP_CONFIG_SEED);
    const crosschainConfig = this.getPda(CROSSCHAIN_CONFIG_SEED);

    return {
      controller: controller,
      user: this.provider.publicKey,
      redeemableMint: redeemable_mint,
      userRedeemable: userRedeemATA,
      depository: depository,
      depositoryVault: depositoryVault,
      oracle: ctrAdsSolana.oracle,
      loanAccount: pdAddress,
      reserve: RESERVE_ACCOUNT,
      reserveTokenAccount: reserveTokenAccount,
      collateralToken1: new PublicKey(tokenAddress),
      collateral1: collateral1,
      userCollateral1: userCollateral1,
      redeemConfig: redeemConfig,
      swapConfig: swapConfig,
      crosschainConfig: crosschainConfig,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUserLoanByToken(user: PublicKey, _token: PublicKey) {
    // const depositoryPda = this.getPda(DEPOSITORY_TYPE1_SEED, token);
    const depositoryPda = this.getPda(DEPOSITORY_TYPE1_SEED);
    const pdAddress = this.getPda(LOAN_TYPE1_SEED, depositoryPda, user);

    return { pdAddress, depositoryPda };
  }

  private async _getOrCreateTokenAccountTx(mint: PublicKey, payer: PublicKey): Promise<TransactionInstruction | undefined> {
    const tokenAccount = getAssociatedTokenAddressSync(mint, payer, true);
    const transaction: TransactionInstruction[] = [];

    try {
      await getAccount(this.provider.connection, tokenAccount, 'confirmed');
      return undefined;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      transaction.push(
        createAssociatedTokenAccountInstruction(payer, tokenAccount, payer, mint, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID)
      );
    }

    return transaction[0];
  }

  async getAccountType0Depository(address: PublicKey) {
    return await queryClient.ensureQueryData({
      queryKey: ['AccountType0Depository', address],
      queryFn: async () => await this.program.account.type0Depository.fetch(address),
    });
  }

  async getLoanType0(userLoanPDAAddress: PublicKey) {
    try {
      return await this.program.account.loanType1.fetch(userLoanPDAAddress);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async initialize(): Promise<string> {
    return '';
  }

  async getLoan(tokenAddress: string) {
    //Only accept these collateral
    const fixedAvailableCollateral = [
      mapNameToInfoSolana[TokenName.ORAI].address,
      mapNameToInfoSolana[TokenName.USDC].address,
      mapNameToInfoSolana[TokenName.SOL].address,
      mapNameToInfoSolana[TokenName.MAX].address,
    ];

    const { depository } = this.getAccountsPartial(tokenAddress);
    const loanPda = this.getPda(LOAN_TYPE1_SEED, depository, this.provider.publicKey);
    const loan = await this.program.account.loanType1.fetch(loanPda);
    const addressCollateral = loan.collateralToken.findIndex((token) => token.toString() === tokenAddress);
    const collateralAmount = addressCollateral !== -1 ? loan.collateralAmount[addressCollateral] : new BN(0);
    const listAvailableCollateral = loan.collateralAmount.reduce((acc: string[], curr, index) => {
      if (Number(curr) > 0 && fixedAvailableCollateral.indexOf(loan.collateralToken[index].toString()) !== -1) {
        acc.push(loan.collateralToken[index].toString());
      }

      return acc;
    }, [] as string[]);
    const result = { ...loan, collateralAmount, listAvailableCollateral };

    return result;
  }

  async deposit(depositAmount: number, tokenAddress: string, universalWallet?: string): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(depositAmount * decimal);
    const accountsPartial = this.getAccountsPartial(tokenAddress);
    const transaction = await this._getOrCreateTokenAccountTx(new PublicKey(tokenAddress), this.provider.publicKey);
    const listInstruction = transaction ? [transaction] : [];

    if (tokenAddress === (solTokenSolana.address || solanaDevnet.address)) {
      listInstruction.concat(this.wrapSol(tokenAddress, collateralAmount).instructions);
    }

    if (!universalWallet) {
      const depositTransaction = await this.program.methods
        .type1DepositoryDeposit(collateralAmount)
        .accountsPartial(accountsPartial)
        .instruction();
      listInstruction.push(depositTransaction);
    } else {
      const loanAccountUniversal = this.getUserLoanByToken(new PublicKey(universalWallet), new PublicKey(tokenAddress));
      const crosschainDepository = this.getPda(CROSSCHAIN_DEPOSITORY_TYPE1_SEED, Number(mapChainIdToName['solana']));

      const depositTransaction = await this.program.methods
        .userCrosschainType1Deposit(collateralAmount)
        .accountsPartial({
          universalWallet: new PublicKey(universalWallet),
          loanAccount: loanAccountUniversal.pdAddress,
          crosschainConfig: accountsPartial.crosschainConfig,
          depository: accountsPartial.depository,
          depositoryVault: accountsPartial.depositoryVault,
          user: accountsPartial.user,
          collateralToken: accountsPartial.collateralToken1,
          userCollateralAta: accountsPartial.userCollateral1,
          crosschainDepository: crosschainDepository,
        })
        .instruction();
      listInstruction.push(depositTransaction);
    }

    const result = new VersionedTransaction(
      new TransactionMessage({
        payerKey: this.provider.publicKey,
        recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
        instructions: listInstruction,
      }).compileToV0Message()
    );
    const transactionHash = await this.sendTransaction(result);

    await queryClient.invalidateQueries({ queryKey: ['useMyPortfolio', this.provider.publicKey, appStore.get(crossModeAtom)] });
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async borrow(borrowAmount: number, tokenAddress: string, isMax?: boolean, universalWallet?: string): Promise<string> {
    //borrow in cross mode doesn't need tokenAddress param but we still use this here for sync interface with LendingContract class
    const maxAmount = utilBN(2).pow(64).minus(1);
    const usdaiAmount = (isMax ? new BN(maxAmount.toString()) : new BN(borrowAmount * 1e6)) as BN;
    const accountsPartial = this.getAccountsPartial(tokenAddress);
    //Init usdai token account, not tokenAddress
    const initAccountInstruction = await this._getOrCreateTokenAccountTx(new PublicKey(usdaiAddress), this.provider.publicKey);
    const listInstruction: TransactionInstruction[] = initAccountInstruction ? [initAccountInstruction] : [];

    if (!universalWallet) {
      throw new Error('Universal wallet is required');
    }

    const loanAccountUniversal = this.getUserLoanByToken(new PublicKey(universalWallet), new PublicKey(usdaiAddress));
    const crosschainDepository = this.getPda(CROSSCHAIN_DEPOSITORY_TYPE1_SEED, Number(mapChainIdToName['solana']));

    const transaction = await this.program.methods
      .userCrosschainType1Mint(usdaiAmount)
      .accountsPartial({
        ...accountsPartial,
        universalWallet: new PublicKey(universalWallet),
        loanAccount: loanAccountUniversal.pdAddress,
        crosschainDepository: crosschainDepository,
      })
      .instruction();
    listInstruction.push(transaction);

    const result = new VersionedTransaction(
      new TransactionMessage({
        payerKey: this.provider.publicKey,
        recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
        instructions: listInstruction,
      }).compileToV0Message()
    );
    const transactionHash = await this.sendTransaction(result);

    await queryClient.invalidateQueries({ queryKey: ['useMyPortfolio', this.provider.publicKey, appStore.get(crossModeAtom)] });
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async repay(debtAmount: number, tokenAddress: string, isMax?: boolean, universalWallet?: string): Promise<string> {
    const maxAmount = utilBN(2).pow(64).minus(1);
    const usdaiAmount = isMax ? new BN(maxAmount.toString()) : new BN(debtAmount * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);
    const listInstruction: TransactionInstruction[] = [];

    if (!universalWallet) {
      throw new Error('Universal wallet is required');
    }

    const loanAccountUniversal = this.getUserLoanByToken(new PublicKey(universalWallet), new PublicKey(usdaiAddress));
    const crosschainDepository = this.getPda(CROSSCHAIN_DEPOSITORY_TYPE1_SEED, Number(mapChainIdToName['solana']));

    const transaction = await this.program.methods
      .userCrosschainType1Burn(usdaiAmount)
      .accountsPartial({
        ...accountsPartial,
        universalWallet: new PublicKey(universalWallet),
        loanAccount: loanAccountUniversal.pdAddress,
        crosschainDepository: crosschainDepository,
      })
      .instruction();
    listInstruction.push(transaction);

    const result = new VersionedTransaction(
      new TransactionMessage({
        payerKey: this.provider.publicKey,
        recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
        instructions: listInstruction,
      }).compileToV0Message()
    );
    const transactionHash = await this.sendTransaction(result);

    await queryClient.invalidateQueries({ queryKey: ['useMyPortfolio', this.provider.publicKey, appStore.get(crossModeAtom)] });
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async withdraw(depositAmount: number, tokenAddress: string, universalWallet?: string): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(depositAmount * decimal);
    const createAccountInstruction = await this._getOrCreateTokenAccountTx(new PublicKey(tokenAddress), this.provider.publicKey);
    const accountsPartial = this.getAccountsPartial(tokenAddress);
    const listInstruction: TransactionInstruction[] = createAccountInstruction ? [createAccountInstruction] : [];

    if (!universalWallet) {
      throw new Error('Universal wallet is required');
    }

    const loanAccountUniversal = this.getUserLoanByToken(new PublicKey(universalWallet), new PublicKey(tokenAddress));
    const crosschainDepository = this.getPda(CROSSCHAIN_DEPOSITORY_TYPE1_SEED, Number(mapChainIdToName['solana']));

    const transaction = await this.program.methods
      .userCrosschainType1Withdraw(collateralAmount)
      .accountsPartial({
        user: accountsPartial.user,
        controller: accountsPartial.controller,
        crosschainConfig: accountsPartial.crosschainConfig,
        universalWallet: new PublicKey(universalWallet),
        loanAccount: loanAccountUniversal.pdAddress,
        crosschainDepository: crosschainDepository,
        collateralToken: accountsPartial.collateralToken1,
        userCollateralAta: accountsPartial.userCollateral1,
        depository: accountsPartial.depository,
        depositoryVault: accountsPartial.depositoryVault,
        oracle: accountsPartial.oracle,
        reserveTokenAccount: accountsPartial.reserveTokenAccount,
        redeemableMint: accountsPartial.redeemableMint,
      })
      .instruction();
    listInstruction.push(transaction);

    if (tokenAddress === (solTokenSolana.address || solanaDevnet.address)) {
      listInstruction.concat((await this.unwrapSol()).instructions);
    }

    const result = new VersionedTransaction(
      new TransactionMessage({
        payerKey: this.provider.publicKey,
        recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
        instructions: listInstruction,
      }).compileToV0Message()
    );
    const transactionHash = await this.sendTransaction(result);

    await queryClient.invalidateQueries({ queryKey: ['useMyPortfolio', this.provider.publicKey, appStore.get(crossModeAtom)] });
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

  async getDepositoryVault(tokenAddress: string) {
    const { depositoryVault } = this.getAccountsPartial(tokenAddress);
    const depository = await getAccount(this.provider.connection, depositoryVault);

    return depository;
  }

  //Collateral Type 1 in Cross Mode
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

    const redeemCollIns = await this.getRedeemByCollateralInstruction(selectedToken, collateralAmountRaw, remainingAccounts, dataSwap);

    const addressLookupTableAccounts: AddressLookupTableAccount[] = [];
    addressLookupTableAccounts.push(...(await getAddressLookupTableAccounts(resultSwapInstructions.addressLookupTableAddresses)));
    const instruction = [ComputeBudgetProgram.setComputeUnitLimit({ units: 1400000 }), addPriorityFee(priorityFee), redeemCollIns];
    const isHasUserCollateral1 = await this.checkUserCollateral(new PublicKey(selectedToken));
    if (isHasUserCollateral1 !== null) {
      instruction.unshift(isHasUserCollateral1);
    }
    const blockhash = (await this.provider.connection.getLatestBlockhash()).blockhash;
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
        .type1RedeemByCollateral(new BN(amountCollateral), data)
        .accountsPartial({
          ...accountsPartial,
          jupiterProgram: jupiterProgram,
          collateral: new PublicKey(tokenMintAddress),
          userCollateral: accountsPartial.userCollateral1,
          depositoryType1: accountsPartial.depository,
          redeemConfigV2: accountsPartial.redeemConfig,
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
    const trans = new Transaction();
    const { instruction } = await this.getSwapTokenInstruction(tokenAddress, amount, isReverse);
    trans.add(...instruction);
    const transactionHash = await this.sendTransaction(trans);

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
          stablecoinUserAta: accountsPartial.userCollateral1,
          usdai: new PublicKey(usdaiAddress),
          stablecoin: accountsPartial.collateral1,
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
    const destinationWalletBytes = Array.from(Buffer.from(new PublicKey(destinationWallet).toBytes()));

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
