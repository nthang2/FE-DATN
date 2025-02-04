import { AnchorProvider, Idl, Program } from '@project-serum/anchor';
import { Wallet } from '@project-serum/anchor/dist/cjs/provider';
import { ComputeBudgetProgram, PublicKey, Transaction } from '@solana/web3.js';
import { publicClientSol } from 'src/states/wallets/solana-blockchain/configs';

export abstract class SolanaContractAbstract<IDL extends Idl> {
    public provider: AnchorProvider;
    public program: Program<IDL>;

    constructor(wallet: Wallet, programId: PublicKey, idl: IDL) {
        this.provider = new AnchorProvider(publicClientSol, wallet, { preflightCommitment: 'confirmed' });
        this.program = new Program(idl, programId, this.provider);
    }

    abstract initialize(...args: any[]): Promise<string>;

    setfeeGas(gas: number) {
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
