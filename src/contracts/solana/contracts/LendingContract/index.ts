/* eslint-disable @typescript-eslint/no-explicit-any */
import { BN } from '@coral-xyz/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { queryClient } from 'src/layout/Layout';
import { rpc } from 'src/states/wallets/solana-blockchain/configs';
import { getDecimalToken } from 'src/utils';
import { IdlLending, idlLending } from '../../idl/lending/lending';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { CONTROLLER_SEED, collateral as defaultCollateral, DEPOSITORY_SEED, REDEEMABLE_MINT_SEED } from './constant';
import { BN as utilBN } from 'src/utils/index';

export class LendingContract extends SolanaContractAbstract<IdlLending> {
  constructor(wallet: WalletContextState) {
    super(wallet as any, ctrAdsSolana.lending, idlLending);
  }

  getPda(seed: string, ...tokens: PublicKey[]) {
    const addressParam = tokens.map((token) => token.toBuffer());
    const [pda] = PublicKey.findProgramAddressSync([Buffer.from(seed), ...addressParam], this.program.programId);

    return pda;
  }

  getAccountsPartial(tokenAddress: string) {
    const redeemable_mint = this.getPda(REDEEMABLE_MINT_SEED);
    const collateral = new PublicKey(tokenAddress);
    const userCollateralATA = getAssociatedTokenAddressSync(collateral, this.provider.publicKey);
    const userRedeemATA = getAssociatedTokenAddressSync(redeemable_mint, this.provider.publicKey);
    const { pdAddress } = this.getUserLoanByToken(this.provider.publicKey, collateral);
    const controller = this.getPda(CONTROLLER_SEED);
    const depository = this.getPda(DEPOSITORY_SEED, collateral);
    const depositoryVault = getAssociatedTokenAddressSync(collateral, depository, true);
    const oracle = findTokenInfoByToken(tokenAddress)?.oracle;

    return {
      user: this.provider.publicKey,
      collateral: collateral,
      userCollateral: userCollateralATA,
      redeemableMint: redeemable_mint,
      userRedeemable: userRedeemATA,
      controller: controller,
      depository: depository,
      depositoryVault: depositoryVault,
      oracle: oracle || ctrAdsSolana.oracle,
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

  async getLoanType0(userLoanPDAAddress: PublicKey) {
    try {
      return await this.program.account.loanType0.fetch(userLoanPDAAddress);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async initialize(): Promise<string> {
    return '';
  }

  async deposit(depositAmount: number, tokenAddress: string): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(depositAmount * decimal);
    const usdaiAmount = new BN(0 * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);
    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, true, true)
      .accountsPartial(accountsPartial)
      .transaction();

    const transactionHash = await this.sendTransaction(transaction);
    return transactionHash;
  }

  async borrow(borrowAmount: number, tokenAddress: string, isMax?: boolean): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(0 * decimal);
    const maxAmount = utilBN(2).pow(64).minus(1);
    const usdaiAmount = isMax ? new BN(maxAmount.toString()) : new BN(borrowAmount * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, false, true)
      .accountsPartial(accountsPartial)
      .transaction();
    const transactionHash = await this.sendTransaction(transaction);

    return transactionHash;
  }

  async repay(debtAmount: number, tokenAddress: string, isMax?: boolean): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(0 * decimal);
    const maxAmount = utilBN(2).pow(64).minus(1);
    const usdaiAmount = isMax ? new BN(maxAmount.toString()) : new BN(debtAmount * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, false, false)
      .accountsPartial(accountsPartial)
      .transaction();
    const transactionHash = await this.sendTransaction(transaction);

    return transactionHash;
  }

  async withdraw(depositAmount: number, tokenAddress: string): Promise<string> {
    const decimal = getDecimalToken(tokenAddress);
    const collateralAmount = new BN(depositAmount * decimal);
    const usdaiAmount = new BN(0 * 1e6);
    const accountsPartial = this.getAccountsPartial(tokenAddress);

    const transaction = await this.program.methods
      .interactWithType0Depository(collateralAmount, usdaiAmount, false, true)
      .accountsPartial(accountsPartial)
      .transaction();
    const transactionHash = await this.sendTransaction(transaction);

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
      const account = await new Connection(rpc, 'confirmed').getAccountInfo(address, undefined);
      return account;
    } catch (e: unknown) {
      console.log(e, address.toString());
      throw e;
    }
  }
}
