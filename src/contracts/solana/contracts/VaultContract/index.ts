/* eslint-disable @typescript-eslint/no-explicit-any */
import { BN } from '@coral-xyz/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { IdlVault, idlVault } from '../../idl/vault/vault';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { STAKER_INFO_SEED, VAULT_CONFIG_SEED, VAULT_SEED } from './constant';
import { usdaiSolanaMainnet } from 'src/constants/tokens/solana-ecosystem/solana-mainnet';
import { NETWORK } from 'src/constants';
import { usdaiSolanaDevnet } from 'src/constants/tokens/solana-ecosystem/solana-devnet';
import { getDecimalToken } from 'src/utils';

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
      .stake(new BN(amount * getDecimalToken(usdaiAddress)))
      .accounts({
        signer: this.provider.wallet.publicKey,
        stakeCurrencyMint: new PublicKey(usdaiAddress),
      })
      .transaction();

    await this.sendTransaction(trans);
  }

  async withdraw(amount: number): Promise<void> {
    const trans = await this.program.methods
      .unstake(new BN(amount * getDecimalToken(usdaiAddress)))
      .accounts({
        signer: this.provider.publicKey,
        stakeCurrencyMint: new PublicKey(usdaiAddress),
      })
      .transaction();

    await this.sendTransaction(trans);
  }

  async claimReward(): Promise<void> {
    const trans = await this.program.methods
      .claimReward()
      .accounts({
        signer: this.provider.publicKey,
        stakeCurrencyMint: new PublicKey(usdaiAddress),
      })
      .transaction();
    await this.sendTransaction(trans);
  }

  async getStakedAmount(): Promise<{ amount: BN; pendingReward: BN; index: number }> {
    const [user1Pda] = PublicKey.findProgramAddressSync(
      [Buffer.from(STAKER_INFO_SEED), new PublicKey(usdaiAddress).toBytes(), this.provider.publicKey.toBytes()],
      this.program.programId
    );
    const { amount, index } = await this.program.account.stakerInfo.fetch(user1Pda);

    const slot = await this.provider.connection.getSlot();
    const timestamp = await this.provider.connection.getBlockTime(slot);

    const [vaultConfigPda] = PublicKey.findProgramAddressSync(
      [Buffer.from(VAULT_CONFIG_SEED), new PublicKey(usdaiAddress).toBytes()],
      this.program.programId
    );

    const [vaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from(VAULT_SEED), new PublicKey(usdaiAddress).toBytes()],
      this.program.programId
    );

    const { totalStaked, lastUpdated, globalIndex: vaultGlobalIndex } = await this.program.account.vault.fetch(vaultPda);
    const passTime = new BN(new BN(timestamp) - lastUpdated);
    const { rps, minAprBps } = await this.program.account.vaultConfig.fetch(vaultConfigPda);
    const newestPendingReward = rps * passTime;
    const minRewardPerYear = (totalStaked * passTime * minAprBps) / new BN(10000 * 86400 * 365);
    const globalIndex = vaultGlobalIndex + Math.max(minRewardPerYear, newestPendingReward) / totalStaked;
    const pendingReward = (globalIndex - index) * amount;

    return { amount, pendingReward: pendingReward, index };
  }
}
