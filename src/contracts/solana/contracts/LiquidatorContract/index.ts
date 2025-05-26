import { BN } from '@coral-xyz/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { TokenName } from 'src/libs/crypto-icons';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { queryClient } from 'src/layout/Layout';
import { getDecimalToken } from 'src/utils';
import { idlLiquidator, IdlLiquidator } from '../../idl/liquidator/liquidator';
import { LendingContract } from '../LendingContract/LendingContract';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { CONTROLLER_SEED, LIQUIDATOR_POOL_NAMESPACE, LP_PROVIDER_NAMESPACE, REDEEMABLE_MINT_SEED } from './constant';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lendingContract = this.wallet ? new LendingContract(this.wallet as any) : null;
    const redeemableMint = lendingContract ? lendingContract?.getPda(REDEEMABLE_MINT_SEED) : this.getPda(REDEEMABLE_MINT_SEED);
    const controller = this.getPda(CONTROLLER_SEED);
    const pool = this.getPda(LIQUIDATOR_POOL_NAMESPACE);
    const lpAccount = this.getPda(LP_PROVIDER_NAMESPACE, pool, this.provider.publicKey);
    const userStablecoinAccount = getAssociatedTokenAddressSync(redeemableMint, this.provider.publicKey, true);
    const poolStablecoinAccount = getAssociatedTokenAddressSync(redeemableMint, pool, true);

    return {
      redeemableMint,
      pool,
      userStablecoinAccount,
      controller,
      poolStablecoinAccount,
      lpAccount,
      stablecoinMint: redeemableMint,
    };
  }

  async deposit(depositAmount: string) {
    const accountsPartial = this.getAccountsPartial();
    const decimal = getDecimalToken(mapNameToInfoSolana[TokenName.USDAI].address);

    const transaction = await this.program.methods
      .depositLiquidatorPool(new BN(Number(depositAmount) * decimal))
      .accountsPartial({
        user: this.provider.publicKey,
        ...accountsPartial,
      })
      .transaction();

    const transactionHash = await this.sendTransaction(transaction);
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });
    await queryClient.invalidateQueries({ queryKey: ['useGetStaked', this.provider.publicKey] });

    return transactionHash;
  }

  async withdraw(withdraw: string) {
    const accountsPartial = this.getAccountsPartial();
    const decimal = getDecimalToken(mapNameToInfoSolana[TokenName.USDAI].address);

    const transaction = await this.program.methods
      .withdrawLiquidityPool(new BN(Number(withdraw) * decimal))
      .accountsPartial({
        user: this.provider.publicKey,
        ...accountsPartial,
      })
      .transaction();

    const transactionHash = await this.sendTransaction(transaction);
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });
    await queryClient.invalidateQueries({ queryKey: ['useGetStaked', this.provider.publicKey] });

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
    await queryClient.invalidateQueries({ queryKey: ['solana', 'all-slp-token-balances', this.provider.publicKey.toString()] });

    return transactionHash;
  }

  async getAccountStaked(address: PublicKey) {
    return await queryClient.ensureQueryData({
      queryKey: ['AccountStaked', address],
      queryFn: async () => await this.program.account.liquidatorPool.fetch(address),
    });
  }

  async getTotalStaked() {
    const pool = this.getPda(LIQUIDATOR_POOL_NAMESPACE);
    const account = await this.getAccountStaked(pool);

    return account.supply.toNumber();
  }
}
