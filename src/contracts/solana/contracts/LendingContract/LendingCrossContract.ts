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
import { publicClientSol } from 'src/states/hooks';
import { appStore, crossModeAtom } from 'src/states/state';
import { getDecimalToken } from 'src/utils';
import { BN as utilBN } from 'src/utils/index';
import { addPriorityFee, getAddressLookupTableAccounts } from 'src/views/MyPortfolio/utils';
import { IdlLending, idlLending } from '../../idl/lending/lending';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import {
  CONTROLLER_SEED,
  collateral as defaultCollateral,
  DEPOSITORY_TYPE1_SEED,
  jupiterProgram,
  LOAN_TYPE1_SEED,
  REDEEM_CONFIG,
  REDEEMABLE_MINT_SEED,
  RESERVE_ACCOUNT,
  SWAP_CONFIG_SEED,
} from './constant';

export class LendingCrossContract extends SolanaContractAbstract<IdlLending> {
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
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUserLoanByToken(user: PublicKey, _token: PublicKey) {
    // const depositoryPda = this.getPda(DEPOSITORY_TYPE1_SEED, token);
    const depositoryPda = this.getPda(DEPOSITORY_TYPE1_SEED);
    const pdAddress = this.getPda(LOAN_TYPE1_SEED, depositoryPda, user);

    return { pdAddress, depositoryPda };
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

  async deposit(depositAmount: number, tokenAddress: string): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(depositAmount * decimal);
    const { ...accountsPartial } = this.getAccountsPartial(tokenAddress);
    const transaction = await this._getOrCreateTokenAccountTx(new PublicKey(tokenAddress), this.provider.publicKey);

    if (tokenAddress === (solTokenSolana.address || solanaDevnet.address)) {
      transaction.add(this.wrapSol(tokenAddress, collateralAmount));
    }

    const depositTransaction = await this.program.methods
      .type1DepositoryDeposit(collateralAmount)
      .accountsPartial(accountsPartial)
      .transaction();
    transaction.add(depositTransaction);

    const transactionHash = await this.sendTransaction(transaction);
    await queryClient.invalidateQueries({ queryKey: ['useMyPortfolio', this.provider.publicKey, appStore.get(crossModeAtom)] });
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async borrow(borrowAmount: number, tokenAddress: string, isMax?: boolean): Promise<string> {
    //borrow in cross mode doesn't need tokenAddress param but we still use this here for sync interface with LendingContract class
    const maxAmount = utilBN(2).pow(64).minus(1);
    const usdaiAmount = (isMax ? new BN(maxAmount.toString()) : new BN(borrowAmount * 1e6)) as BN;
    const accountsPartial = this.getAccountsPartial(tokenAddress);

    const transaction = await this.program.methods.type1DepositoryMint(usdaiAmount).accountsPartial(accountsPartial).transaction();
    const transactionHash = await this.sendTransaction(transaction);

    await queryClient.invalidateQueries({ queryKey: ['useMyPortfolio', this.provider.publicKey, appStore.get(crossModeAtom)] });
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async repay(debtAmount: number, tokenAddress: string, isMax?: boolean): Promise<string> {
    const maxAmount = utilBN(2).pow(64).minus(1);
    const usdaiAmount = isMax ? new BN(maxAmount.toString()) : new BN(debtAmount * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);

    const transaction = await this.program.methods.type1DepositoryBurn(usdaiAmount).accountsPartial(accountsPartial).transaction();
    const transactionHash = await this.sendTransaction(transaction);

    await queryClient.invalidateQueries({ queryKey: ['useMyPortfolio', this.provider.publicKey, appStore.get(crossModeAtom)] });
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async withdraw(depositAmount: number, tokenAddress: string): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(depositAmount * decimal);
    const accountsPartial = this.getAccountsPartial(tokenAddress);
    const isHasUserCollateral1 = await this.checkUserCollateral(new PublicKey(tokenAddress));
    const resultTransaction = new Transaction();

    if (isHasUserCollateral1 !== null) {
      resultTransaction.add(isHasUserCollateral1);
    }

    const transaction = await this.program.methods.type1DepositoryWithdraw(collateralAmount).accountsPartial(accountsPartial).transaction();
    resultTransaction.add(transaction);

    if (tokenAddress === (solTokenSolana.address || solanaDevnet.address)) {
      resultTransaction.add(await this.unwrapSol());
    }

    const transactionHash = await this.sendTransaction(resultTransaction);

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

  async getSwapTokenInstruction(tokenAddress: string, amount: number | string, isReverse: boolean) {
    const accountsPartial = this.getAccountsPartial(tokenAddress);
    const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
    const selectedTokenInfo = findTokenInfoByToken(tokenAddress);
    const stablecoinReserveAta = getAssociatedTokenAddressSync(new PublicKey(tokenAddress), RESERVE_ACCOUNT, true);
    const usdaiReserveAta = getAssociatedTokenAddressSync(new PublicKey(usdaiInfo.address), RESERVE_ACCOUNT, true);

    if (!selectedTokenInfo) {
      throw new Error('Token not found');
    }

    const amountRaw = isReverse
      ? new BN(
          utilBN(amount)
            .multipliedBy(utilBN(10).pow(utilBN(selectedTokenInfo.decimals)))
            .toString()
        )
      : new BN(
          utilBN(amount)
            .multipliedBy(utilBN(10).pow(utilBN(usdaiInfo.decimals)))
            .toString()
        );
    let instruction: TransactionInstruction;

    try {
      instruction = await this.program.methods
        .swapUsdaiType0(amountRaw, isReverse)
        .accountsPartial({
          user: accountsPartial.user,
          controller: accountsPartial.controller,
          stablecoinDepository: accountsPartial.depository,
          stablecoinDepositoryVault: accountsPartial.depositoryVault,
          stablecoinUserAta: accountsPartial.userCollateral1,
          usdaiUserAta: accountsPartial.userRedeemable,
          usdai: accountsPartial.redeemableMint,
          stablecoin: tokenAddress,
          swapConfig: accountsPartial.swapConfig,
          reserve: accountsPartial.reserve,
          stablecoinReserveAta,
          usdaiReserveAta,
        })
        .instruction();
    } catch (error) {
      console.error('❌ Error get ins swap token:', error);
      throw error;
    }

    return instruction;
  }

  async swapToken(tokenAddress: string, amount: number, isReverse: boolean) {
    const trans = new Transaction();
    const instruction = await this.getSwapTokenInstruction(tokenAddress, amount, isReverse);
    trans.add(instruction);
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
}
