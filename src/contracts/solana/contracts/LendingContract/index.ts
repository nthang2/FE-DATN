/* eslint-disable @typescript-eslint/no-explicit-any */
import { BN } from '@coral-xyz/anchor';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { IdlLending, idlLending } from '../../idl/lending/lending';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { DEPOSITORY_SEED, REDEEMABLE_MINT_SEED, collateral, CONTROLLER_SEED, oracle } from './constains';

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
    const loanPda = this.getPda3('LOAN', depositoryPda, user);
    return loanPda;
  };

  async initialize(): Promise<string> {
    const redeemable_mint = this.getPda1(REDEEMABLE_MINT_SEED);
    const userCollateralATA = await getAssociatedTokenAddressSync(this.provider.publicKey, collateral);
    const userRedeemATA = await getAssociatedTokenAddressSync(this.provider.publicKey, redeemable_mint);
    const loanAccount = await this.getUserLoanByToken(this.provider.publicKey, collateral);
    const collateralAmount = new BN(3 * 1e9);
    const usdaiAmount = new BN(100 * 1e6);
    const controller = this.getPda1(CONTROLLER_SEED);
    const depository = this.getPda2(DEPOSITORY_SEED, collateral);
    const depositoryVault = await getAssociatedTokenAddressSync(collateral, depository, true);

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
          oracle: oracle,
          loanAccount: loanAccount,
        })
        .transaction();
      console.log('🚀 ~ LendingContract ~ initialize ~ temp:', temp);

      const { blockhash, lastValidBlockHeight } = await this.provider.connection.getLatestBlockhash();
      temp.recentBlockhash = blockhash;
      temp.feePayer = this.provider.publicKey;

      const signedTx = await this.provider.wallet.signTransaction(temp);

      const txid = await this.provider.connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });

      await this.provider.connection.confirmTransaction(
        {
          signature: txid,
          blockhash,
          lastValidBlockHeight,
        },
        'confirmed'
      );
    } catch (error) {
      console.log('🚀 ~ LendingContract ~ initialize ~ error:', error);
    }
    return '';
  }
}
