/* eslint-disable @typescript-eslint/no-explicit-any */
import { BN } from '@coral-xyz/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { queryClient } from 'src/layout/Layout';
import { IdlLending, idlLending } from '../../idl/lending/lending';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { collateral, CONTROLLER_SEED, DEPOSITORY_SEED, REDEEMABLE_MINT_SEED } from './constains';

export class LendingContract extends SolanaContractAbstract<IdlLending> {
  constructor(wallet: WalletContextState) {
    super(wallet as any, ctrAdsSolana.lending, idlLending);
  }

  getPda(seed: string, ...tokens: PublicKey[]) {
    const addressParam = tokens.map((token) => token.toBuffer());
    const [pda] = PublicKey.findProgramAddressSync([Buffer.from(seed), ...addressParam], this.program.programId);

    return pda;
  }

  getAccountsPartial() {
    const redeemable_mint = this.getPda(REDEEMABLE_MINT_SEED);
    const userCollateralATA = getAssociatedTokenAddressSync(collateral, this.provider.publicKey);
    const userRedeemATA = getAssociatedTokenAddressSync(redeemable_mint, this.provider.publicKey);
    const { pdAddress } = this.getUserLoanByToken(this.provider.publicKey, collateral);
    const controller = this.getPda(CONTROLLER_SEED);
    const depository = this.getPda(DEPOSITORY_SEED, collateral);
    const depositoryVault = getAssociatedTokenAddressSync(collateral, depository, true);

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
    };
  }

  getUserLoanByToken(user: PublicKey, token: PublicKey) {
    const depositoryPda = this.getPda(DEPOSITORY_SEED, token);
    const pdAddress = this.getPda('LOAN', depositoryPda, user);

    return { pdAddress, depositoryPda };
  }

  async getAccountType0Depository(address: PublicKey) {
    return await queryClient.ensureQueryData({
      queryKey: ['AccountType0Depository', address],
      queryFn: async () => await this.program.account.type0Depository.fetch(address),
    });
  }

  async getAmountDeposit(userLoanPDAAddress: PublicKey) {
    try {
      const result = await this.program.account.loanType0.fetch(userLoanPDAAddress);
      return result.collateralAmount.toString();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getYourBorrow(userLoanPDAAddress: PublicKey) {
    try {
      const result = await this.program.account.loanType0.fetch(userLoanPDAAddress);
      return result.mintedAmount.toString();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async initialize(): Promise<string> {
    return '';
  }

  async deposit(depositAmount: number): Promise<string> {
    const collateralAmount = new BN(depositAmount * 1e9);
    const usdaiAmount = new BN(0 * 1e6);
    const accountsPartial = this.getAccountsPartial();

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, true, true)
      .accountsPartial(accountsPartial)
      .transaction();

    const transactionHash = await this.sendTransaction(transaction);
    return transactionHash;
  }

  async borrow(borrowAmount: number): Promise<string> {
    const collateralAmount = new BN(0 * 1e9);
    const usdaiAmount = new BN(borrowAmount * 1e6);
    const accountsPartial = this.getAccountsPartial();

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, false, true)
      .accountsPartial(accountsPartial)
      .transaction();
    const transactionHash = await this.sendTransaction(transaction);

    return transactionHash;
  }

  async repay(debtAmount: number): Promise<string> {
    const collateralAmount = new BN(0 * 1e9);
    const usdaiAmount = new BN(debtAmount * 1e6);
    const accountsPartial = this.getAccountsPartial();

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, false, true)
      .accountsPartial(accountsPartial)
      .transaction();
    const transactionHash = await this.sendTransaction(transaction);

    return transactionHash;
  }

  async withdraw(depositAmount: number): Promise<string> {
    const collateralAmount = new BN(depositAmount * 1e9);
    const usdaiAmount = new BN(0 * 1e6);
    const accountsPartial = this.getAccountsPartial();

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, false, true)
      .accountsPartial(accountsPartial)
      .transaction();
    const transactionHash = await this.sendTransaction(transaction);

    return transactionHash;
  }

  async getMaxLtv(): Promise<number> {
    const { depositoryPda } = this.getUserLoanByToken(this.provider.publicKey, collateral);
    const ratio = (await this.getAccountType0Depository(depositoryPda)).collateralizationRatio;
    const result = 1e9 / ratio.toNumber();

    return result;
  }

  async getBorrowRate(): Promise<number> {
    const { depositoryPda } = this.getUserLoanByToken(this.provider.publicKey, collateral);
    const rate = (await this.getAccountType0Depository(depositoryPda)).rate;
    const result = rate.toNumber() / 1e9 - 1;

    return result;
  }
}
