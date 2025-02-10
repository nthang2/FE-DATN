/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnchorProvider, Idl, Program, Wallet } from '@coral-xyz/anchor';
import { ComputeBudgetProgram, PublicKey, Transaction } from '@solana/web3.js';
import { publicClientSol } from 'src/states/wallets/solana-blockchain/configs';

export abstract class SolanaContractAbstract<IDL extends Idl> {
  public provider: AnchorProvider;
  public program: Program<IDL>;

  constructor(wallet: Wallet, programId: PublicKey, idl: IDL) {
    this.provider = new AnchorProvider(publicClientSol, wallet, { preflightCommitment: 'confirmed' });
    this.program = new Program(idl, { ...this.provider, publicKey: programId });
  }

  abstract initialize(...args: any[]): Promise<string>;

  setFeeGas(gas: number) {
    return ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: gas,
    });
  }
  async sendTransaction(instruction: Transaction, signers: any[] = []) {
    const transaction = new Transaction().add(instruction);
    const signature = await this.provider.sendAndConfirm(transaction, signers, { maxRetries: 1000 * 60 });
    return signature;
  }
}
