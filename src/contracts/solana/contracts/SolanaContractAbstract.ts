/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor';
import { Wallet, WalletContextState } from '@solana/wallet-adapter-react';
import { ComputeBudgetProgram, PublicKey, Transaction } from '@solana/web3.js';
import { publicClientSol } from 'src/states/hooks';

export abstract class SolanaContractAbstract<IDL extends Idl> {
  public provider: AnchorProvider;
  public program: Program<IDL>;
  public wallet: Wallet | null;

  constructor(wallet: WalletContextState, programId: PublicKey, idl: IDL) {
    this.provider = new AnchorProvider(publicClientSol(), wallet as any, { preflightCommitment: 'confirmed' });
    this.program = new Program(idl, { ...this.provider, publicKey: programId });
    this.wallet = wallet.wallet;
  }

  abstract initialize(...args: any[]): Promise<string>;

  setFeeGas(gas: number) {
    return ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: gas,
    });
  }
  async sendTransaction(instruction: Transaction) {
    if (!this.wallet) {
      throw new Error('Please connect wallet');
    }
    // const transaction = new Transaction().add(instruction);
    const signature = await this.provider.sendAndConfirm(instruction, undefined, { maxRetries: 1000 * 60 });
    // const signature = await this.wallet.adapter.sendTransaction(instruction, publicClientSol, {
    //   maxRetries: 1000 * 60,
    //   preflightCommitment: 'confirmed',
    // });
    return signature;
  }
}
