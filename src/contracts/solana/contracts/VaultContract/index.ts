/* eslint-disable @typescript-eslint/no-explicit-any */
import { BN } from '@coral-xyz/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { IdlVault, idlVault } from '../../idl/vault/vault';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { STAKER_INFO_SEED } from './constant';
import { usdaiSolanaMainnet } from 'src/constants/tokens/solana-ecosystem/solana-mainnet';
import { NETWORK } from 'src/constants';
import { usdaiSolanaDevnet } from 'src/constants/tokens/solana-ecosystem/solana-devnet';

const usdaiInfo = NETWORK === 'devnet' ? usdaiSolanaDevnet : usdaiSolanaMainnet;
const usdaiAddress = usdaiInfo.address;

export class VaultContract extends SolanaContractAbstract<IdlVault> {
  constructor(wallet: WalletContextState) {
    super(wallet as any, ctrAdsSolana.vault, idlVault);
  }

  async initialize(): Promise<string> {
    return '';
  }

  async deposit(amount: number): Promise<void> {
    const trans = await this.program.methods
      .stake(new BN(amount * usdaiInfo.decimals))
      .accounts({
        signer: this.provider.wallet.publicKey,
        stakeCurrencyMint: new PublicKey(usdaiAddress),
      })
      .transaction();

    await this.sendTransaction(trans);
  }

  async withdraw(amount: number): Promise<void> {
    const trans = await this.program.methods
      .unstake(new BN(amount * usdaiInfo.decimals))
      .accounts({
        signer: this.provider.publicKey,
        stakeCurrencyMint: new PublicKey(usdaiAddress),
      })
      .transaction();

    const hash = await this.sendTransaction(trans);
    console.log('🚀 ~ VaultContract ~ withdraw ~ hash:', hash);
  }

  async claimReward(): Promise<void> {
    const trans = await this.program.methods
      .claimReward()
      .accounts({
        signer: this.provider.publicKey,
        stakeCurrencyMint: new PublicKey(usdaiAddress),
      })
      .transaction();
    const hash = await this.sendTransaction(trans);
    console.log('🚀 ~ VaultContract ~ withdraw ~ hash:', hash);
  }

  async getStakedAmount(): Promise<{ amount: BN; pendingReward: BN }> {
    const [user1Pda] = PublicKey.findProgramAddressSync(
      [Buffer.from(STAKER_INFO_SEED), new PublicKey(usdaiAddress).toBytes(), this.provider.publicKey.toBytes()],
      this.program.programId
    );
    const { amount, pendingReward } = await this.program.account.stakerInfo.fetch(user1Pda);

    return { amount, pendingReward };
  }
}
