/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnchorProvider, Idl, Program } from '@coral-xyz/anchor';
import {
  createAssociatedTokenAccountInstruction,
  createCloseAccountInstruction,
  createSyncNativeInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  NATIVE_MINT,
} from '@solana/spl-token';
import { SendTransactionOptions } from '@solana/wallet-adapter-base';
import { Wallet, WalletContextState } from '@solana/wallet-adapter-react';
import { ComputeBudgetProgram, PublicKey, SystemProgram, Transaction, VersionedTransaction } from '@solana/web3.js';
import { publicClientSol } from 'src/states/hooks';
import { sleep } from 'src/utils';

export abstract class SolanaContractAbstract<IDL extends Idl> {
  public provider: AnchorProvider;
  public program: Program<IDL>;
  public wallet: Wallet | null;
  public contextWallet: WalletContextState | null;

  constructor(wallet: WalletContextState | null, programId: PublicKey, idl: IDL) {
    this.provider = new AnchorProvider(publicClientSol(), wallet as any, { preflightCommitment: 'confirmed' });
    this.program = new Program(idl, { ...this.provider, publicKey: programId });
    this.wallet = wallet?.wallet || null;
    this.contextWallet = wallet;
  }

  abstract initialize(...args: any[]): Promise<string>;

  setFeeGas(gas: number) {
    return ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: gas,
    });
  }

  async getNetWorkFee(tx?: Transaction): Promise<number> {
    const connection = publicClientSol();
    const transaction = tx || new Transaction();
    try {
      // Ensure transaction has a recent blockhash and feePayer
      if (!transaction.recentBlockhash) {
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
      }
      if (!transaction.feePayer) {
        if (this.contextWallet?.publicKey) {
          transaction.feePayer = this.contextWallet.publicKey;
        } else {
          throw new Error('Wallet not connected: fee payer is required');
        }
      }
      // Get the fee for the transaction message
      const message = transaction.compileMessage();
      const feeInfo = await connection.getFeeForMessage(message);
      const fee = feeInfo.value || 0;

      return fee;
    } catch (error) {
      console.log('🚀 ~ SolanaContractAbstract<IDL ~ getNetWorkFee ~ error:', error);
      return 0;
    }
  }

  wrapNative(fromPubkey: PublicKey, amount: number): Transaction {
    const fromTokenAccount = getAssociatedTokenAddressSync(NATIVE_MINT, fromPubkey);

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromPubkey,
        toPubkey: fromTokenAccount,
        lamports: amount,
      }),
      createSyncNativeInstruction(fromTokenAccount)
    );
    return tx;
  }

  wrapSol(inputToken: string, amount: number): Transaction {
    if (inputToken === NATIVE_MINT.toBase58()) {
      return this.wrapNative(this.provider.publicKey, amount);
    }

    return new Transaction();
  }

  async unwrapSol(wsolMint: PublicKey = new PublicKey('So11111111111111111111111111111111111111112')) {
    const associatedTokenAccount = await getAssociatedTokenAddress(wsolMint, this.provider.publicKey);
    const inx = createCloseAccountInstruction(associatedTokenAccount, this.provider.publicKey, this.provider.publicKey, []);
    const tx = new Transaction().add(inx);

    return tx;
  }

  getPda(seed: string, ...tokens: (PublicKey | number)[]) {
    const addressParam = tokens.map((token) => (token instanceof PublicKey ? token.toBuffer() : Buffer.from([token])));
    const [pda] = PublicKey.findProgramAddressSync([Buffer.from(seed), ...addressParam], this.program.programId);

    return pda;
  }

  async checkUserCollateral(tokenAddress: PublicKey) {
    try {
      const userCollateral1 = getAssociatedTokenAddressSync(new PublicKey(tokenAddress), this.provider.publicKey);
      await getAccount(this.provider.connection, userCollateral1);

      return null;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name.includes('TokenAccountNotFoundError')) {
          const newAssociatedTokenAddress = await getAssociatedTokenAddress(new PublicKey(tokenAddress), this.provider.publicKey);
          const result = createAssociatedTokenAccountInstruction(
            this.provider.publicKey,
            newAssociatedTokenAddress,
            this.provider.publicKey,
            new PublicKey(tokenAddress)
          );

          return result;
        }

        throw new Error(error.message);
      }

      throw new Error('');
    }
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

  async sendTransaction(
    transaction: Transaction | VersionedTransaction,
    options?: SendTransactionOptions,
    disableThrowSimulateError = false
  ) {
    const connection = publicClientSol();
    if (transaction instanceof VersionedTransaction) {
      const simulate = await connection.simulateTransaction(transaction, { replaceRecentBlockhash: true, commitment: 'finalized' });
      console.log('Simulation:', simulate);
      if (simulate.value.err && !disableThrowSimulateError) {
        throw new Error('Simulate error:' + simulate.value.logs?.join('\n'));
      }
    }
    if (this.contextWallet?.wallet?.adapter.name === 'Phantom') {
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

    const signature = await this.contextWallet?.sendTransaction(transaction, connection, {
      maxRetries: 1000 * 60,
      preflightCommitment: 'finalized',
      ...options,
    });
    await this.awaitConfirmTransaction(signature || '');

    return signature;
  }
}
