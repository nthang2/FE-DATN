/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor';
import { SendTransactionOptions } from '@solana/wallet-adapter-base';
import { Wallet, WalletContextState } from '@solana/wallet-adapter-react';
import { ComputeBudgetProgram, PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js';
import { publicClientSol } from 'src/states/hooks';
import { sleep } from 'src/utils';

export abstract class SolanaContractAbstract<IDL extends Idl> {
  public provider: AnchorProvider;
  public program: Program<IDL>;
  public wallet: Wallet | null;
  public contextWallet: WalletContextState;

  constructor(wallet: WalletContextState, programId: PublicKey, idl: IDL) {
    this.provider = new AnchorProvider(publicClientSol(), wallet as any, { preflightCommitment: 'confirmed' });
    this.program = new Program(idl, { ...this.provider, publicKey: programId });
    this.wallet = wallet.wallet;
    this.contextWallet = wallet;
  }

  abstract initialize(...args: any[]): Promise<string>;

  setFeeGas(gas: number) {
    return ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: gas,
    });
  }

  async awaitConfirmTransaction(signature: string) {
    const connection = publicClientSol();
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature,
    });
    await sleep(600);
  }

  async sendTransaction(transaction: Transaction | VersionedTransaction, options?: SendTransactionOptions) {
    const connection = publicClientSol();
    if (transaction instanceof VersionedTransaction) {
      const simulate = await connection.simulateTransaction(transaction, { commitment: 'finalized' });
      console.log('Simulation:', simulate);
      if (simulate.value.err) {
        throw new Error('Simulate error:' + simulate.value.logs?.join('\n'));
      }
    }
    if (this.contextWallet.wallet?.adapter.name === 'Phantom') {
      console.log('Phantom wallet detected');
      const provider = window?.phantom?.solana;
      if (transaction instanceof Transaction) {
        if (!this.contextWallet.publicKey) {
          throw new Error('Wallet not connected!');
        }
        transaction.feePayer = this.contextWallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      }
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { signature } = await provider?.signAndSendTransaction(transaction);
      await this.awaitConfirmTransaction(signature);
      return signature;
    }

    const signature = await this.contextWallet.sendTransaction(transaction, connection, {
      maxRetries: 1000 * 60,
      preflightCommitment: 'finalized',
      ...options,
    });
    await this.awaitConfirmTransaction(signature);

    return signature;
  }
}
