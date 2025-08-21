/* eslint-disable @typescript-eslint/no-explicit-any */
import { BN } from '@coral-xyz/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import { NETWORK } from 'src/constants';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { usdaiSolanaDevnet } from 'src/constants/tokens/solana-ecosystem/solana-devnet';
import { usdaiSolanaMainnet } from 'src/constants/tokens/solana-ecosystem/solana-mainnet';
import { getDecimalToken } from 'src/utils';
import { IdlVault, idlVault } from '../../idl/vault/vault';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { STAKER_INFO_SEED, VAULT_CONFIG_SEED, VAULT_SEED } from './constant';
import { BN as utilBN } from 'src/utils';

const usdaiInfo = NETWORK === 'devnet' ? usdaiSolanaDevnet : usdaiSolanaMainnet;
export const usdaiAddress = usdaiInfo.address;

export class VaultContract extends SolanaContractAbstract<IdlVault> {
  constructor(wallet: WalletContextState) {
    super(wallet as any, ctrAdsSolana.vault, idlVault);
  }

  async initialize(): Promise<string> {
    return '';
  }

  async deposit(amount: number | string, instruction: Transaction): Promise<string> {
    if (!this.wallet) throw new Error('Wallet not connected!');
    const result = new Transaction();
    result.add(instruction);

    const transactionAmount = utilBN(amount)
      .multipliedBy(utilBN(10).pow(utilBN(usdaiInfo.decimals)))
      .toNumber();

    const trans = await this.program.methods
      .stake(new BN(transactionAmount))
      .accounts({
        signer: this.provider.wallet.publicKey,
        stakeCurrencyMint: new PublicKey(usdaiAddress),
      })
      .transaction();
    result.add(trans);
    const hash = await this.sendTransaction(result);

    return hash;
  }

  async withdraw(amount: number, instruction: Transaction): Promise<string> {
    const result = new Transaction();

    const trans = await this.program.methods
      .unstake(new BN(amount * getDecimalToken(usdaiAddress)))
      .accounts({
        signer: this.provider.publicKey,
        stakeCurrencyMint: new PublicKey(usdaiAddress),
      })
      .transaction();
    result.add(trans);
    result.add(instruction);

    const hash = await this.sendTransaction(result);
    return hash;
  }

  async claimReward(): Promise<string> {
    const trans = await this.program.methods
      .claimReward()
      .accounts({
        signer: this.provider.publicKey,
        stakeCurrencyMint: new PublicKey(usdaiAddress),
      })
      .transaction();
    const hash = await this.sendTransaction(trans);
    return hash;
  }

  async getStakedAmount(): Promise<{ amount: BN; pendingReward: BN; index: number }> {
    const [user1Pda] = PublicKey.findProgramAddressSync(
      [Buffer.from(STAKER_INFO_SEED), new PublicKey(usdaiAddress).toBytes(), this.provider.publicKey.toBytes()],
      this.program.programId
    );
    const { amount, index, pendingReward: userPendingReward } = await this.program.account.stakerInfo.fetch(user1Pda);

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
    const pendingReward = (globalIndex - index) * Number(amount) + Number(userPendingReward);

    return { amount, pendingReward: pendingReward, index };
  }

  async getBannerInfo(): Promise<{ apr: number; tvl: number }> {
    const [vaultConfigPda] = PublicKey.findProgramAddressSync(
      [Buffer.from(VAULT_CONFIG_SEED), new PublicKey(usdaiAddress).toBytes()],
      this.program.programId
    );

    const [vaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from(VAULT_SEED), new PublicKey(usdaiAddress).toBytes()],
      this.program.programId
    );

    const { totalStaked } = await this.program.account.vault.fetch(vaultPda);
    const { rps } = await this.program.account.vaultConfig.fetch(vaultConfigPda);
    const apr = (rps / totalStaked) * new BN(86400 * 365 * 100);

    return { apr, tvl: Number(totalStaked) / getDecimalToken(usdaiAddress) };
  }
}
