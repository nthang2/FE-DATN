import { BN } from '@coral-xyz/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { idlLiquidator, IdlLiquidator } from '../../idl/liquidator/liquidator';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { CONTROLLER_SEED, LIQUIDATOR_POOL_NAMESPACE, LP_PROVIDER_NAMESPACE, REDEEMABLE_MINT_SEED } from './constant';
import { queryClient } from 'src/layout/Layout';

export class LiquidatorContract extends SolanaContractAbstract<IdlLiquidator> {
  constructor(wallet: WalletContextState) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    super(wallet as any, ctrAdsSolana.liquidator, idlLiquidator);
  }

  async initialize(): Promise<string> {
    return '';
  }

  getPda(seed: string, ...tokens: PublicKey[]) {
    const addressParam = tokens.map((token) => token.toBuffer());
    const [pda] = PublicKey.findProgramAddressSync([Buffer.from(seed), ...addressParam], this.program.programId);

    return pda;
  }

  getAccountsPartial() {
    const redeemableMint = this.getPda(REDEEMABLE_MINT_SEED);
    const controller = this.getPda(CONTROLLER_SEED);
    const pool = this.getPda(LIQUIDATOR_POOL_NAMESPACE);
    const lpAccount = this.getPda(LP_PROVIDER_NAMESPACE, pool, this.provider.publicKey);
    const userStablecoinAccount = getAssociatedTokenAddressSync(redeemableMint, this.provider.publicKey, true);
    const poolStablecoinAccount = getAssociatedTokenAddressSync(redeemableMint, pool, true);

    console.log({
      redeemableMint: redeemableMint.toString(),
      pool: pool.toString(),
      userStablecoinAccount: userStablecoinAccount.toString(),
      controller: controller.toString(),
      poolStablecoinAccount: poolStablecoinAccount.toString(),
      lpAccount: lpAccount.toString(),
      programId: this.program.programId.toString(),
      rpcEndpoint: this.provider.connection.rpcEndpoint,
    });

    return {
      redeemableMint,
      pool,
      userStablecoinAccount,
      controller,
      poolStablecoinAccount,
      lpAccount,
    };
  }

  async deposit(depositAmount: string) {
    const accountsPartial = this.getAccountsPartial();
    const transaction = await this.program.methods
      .depositLiquidatorPool(new BN(depositAmount))
      .accountsPartial({
        user: this.provider.publicKey,
        ...accountsPartial,
      })
      .transaction();

    const transactionHash = await this.sendTransaction(transaction);
    return transactionHash;
  }

  async withdraw(withdraw: string) {
    const accountsPartial = this.getAccountsPartial();
    const transaction = await this.program.methods
      .withdrawLiquidityPool(new BN(withdraw))
      .accountsPartial({
        user: this.provider.publicKey,
        ...accountsPartial,
      })
      .transaction();

    const transactionHash = await this.sendTransaction(transaction);
    return transactionHash;
  }

  async claim(collateral: string) {
    const accountsPartial = this.getAccountsPartial();
    const collateralPublicKey = new PublicKey(collateral);
    const userCollateralAccount = getAssociatedTokenAddressSync(collateralPublicKey, this.provider.publicKey, true);
    const poolCollateralAccount = getAssociatedTokenAddressSync(collateralPublicKey, accountsPartial.pool, true);

    const transaction = await this.program.methods
      .claimLiquidatorPoolReward()
      .accountsPartial({
        user: this.provider.publicKey,
        poolCollateralAccount,
        userCollateralAccount,
        collateral: collateralPublicKey,
        ...accountsPartial,
      })
      .transaction();

    const transactionHash = await this.sendTransaction(transaction);
    return transactionHash;
  }

  async getAccountStaked(address: PublicKey) {
    return await queryClient.ensureQueryData({
      queryKey: ['AccountStaked', address],
      queryFn: async () => await this.program.account.lpProvider.fetch(address),
    });
  }

  async getStaked() {
    const pool = this.getPda(LIQUIDATOR_POOL_NAMESPACE);
    const lpAccount = this.getPda(LP_PROVIDER_NAMESPACE, pool, this.provider.publicKey);

    const account = await this.getAccountStaked(lpAccount);
    return account.supply.toNumber();
  }
}
