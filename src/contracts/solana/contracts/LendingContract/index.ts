/* eslint-disable @typescript-eslint/no-explicit-any */
import { BN } from '@coral-xyz/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { IdlLending, idlLending } from '../../idl/lending/lending';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { DEPOSITORY_SEED, REDEEMABLE_MINT_SEED, collateral, CONTROLLER_SEED } from './constains';

export class LendingContract extends SolanaContractAbstract<IdlLending> {
  constructor(wallet: WalletContextState) {
    super(wallet as any, ctrAdsSolana.lending, idlLending);
  }

  getPda1 = (seed: string) => {
    const [pda] = PublicKey.findProgramAddressSync([Buffer.from(seed)], this.program.programId);
    return pda;
  };

  getPda2 = (seed: string, token: PublicKey) => {
    const [pda] = PublicKey.findProgramAddressSync([Buffer.from(seed), token.toBuffer()], this.program.programId);
    return pda;
  };

  getPda3 = (seed: string, pubKey1: PublicKey, pubKey2: PublicKey) => {
    const [pda] = PublicKey.findProgramAddressSync([Buffer.from(seed), pubKey1.toBuffer(), pubKey2.toBuffer()], this.program.programId);
    return pda;
  };

  getUserLoanByToken = async (user: PublicKey, token: PublicKey) => {
    const depositoryPda = this.getPda2(DEPOSITORY_SEED, token);
    const pdAddress = this.getPda3('LOAN', depositoryPda, user);

    return { pdAddress };
  };

  async initialize(): Promise<string> {
    const redeemable_mint = this.getPda1(REDEEMABLE_MINT_SEED);
    const userCollateralATA = getAssociatedTokenAddressSync(collateral, this.provider.publicKey);
    const userRedeemATA = getAssociatedTokenAddressSync(redeemable_mint, this.provider.publicKey);
    const { pdAddress } = await this.getUserLoanByToken(this.provider.publicKey, collateral);
    const collateralAmount = new BN(0.1 * 1e9);
    const usdaiAmount = new BN(0 * 1e6);
    const controller = this.getPda1(CONTROLLER_SEED);
    const depository = this.getPda2(DEPOSITORY_SEED, collateral);
    const depositoryVault = getAssociatedTokenAddressSync(collateral, depository, true);

    try {
      const temp = await this.program.methods
        .interactWithType0Depository(collateralAmount, usdaiAmount, true, true)
        .accountsPartial({
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
        })
        .transaction();

      const resp = await this.sendTransaction(temp);
      console.log('🚀 ~ LendingContract ~ initialize ~ resp:', resp);
    } catch (error) {
      console.log('🚀 ~ LendingContract ~ initialize ~ error:', error);
    }
    return '';
  }
}
