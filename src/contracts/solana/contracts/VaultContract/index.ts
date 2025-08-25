/* eslint-disable @typescript-eslint/no-explicit-any */
import { BN } from '@coral-xyz/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { AddressLookupTableAccount, PublicKey, TransactionInstruction, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import { NETWORK } from 'src/constants';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { usdaiSolanaDevnet } from 'src/constants/tokens/solana-ecosystem/solana-devnet';
import { usdaiSolanaMainnet } from 'src/constants/tokens/solana-ecosystem/solana-mainnet';
import { getDecimalToken, BN as utilBN } from 'src/utils';
import { IdlVault, idlVault } from '../../idl/vault/vault';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { STAKER_INFO_SEED, VAULT_CONFIG_SEED, VAULT_SEED } from './constant';

const usdaiInfo = NETWORK === 'devnet' ? usdaiSolanaDevnet : usdaiSolanaMainnet;
export const usdaiAddress = usdaiInfo.address;
export class VaultContract extends SolanaContractAbstract<IdlVault> {
  constructor(wallet: WalletContextState) {
    super(wallet as any, ctrAdsSolana.vault, idlVault);
  }

  async initialize(): Promise<string> {
    return '';
  }

  async deposit(
    amount: number | string,
    tokenAddress: string,
    instruction: TransactionInstruction | null,
    addressLookupTable: AddressLookupTableAccount[] = []
  ): Promise<string> {
    if (!this.wallet) throw new Error('Wallet not connected!');
    const listInstruction = instruction ? [instruction] : [];
    const isHasUserCollateral1 = await this.checkUserCollateral(new PublicKey(tokenAddress));
    const isHasUserUsdaiAccount = await this.checkUserCollateral(new PublicKey(usdaiInfo.address));

    if (isHasUserCollateral1 !== null) {
      listInstruction.unshift(isHasUserCollateral1);
    }

    if (isHasUserUsdaiAccount !== null) {
      listInstruction.unshift(isHasUserUsdaiAccount);
    }

    const transactionAmount = utilBN(amount)
      .multipliedBy(utilBN(10).pow(utilBN(usdaiInfo.decimals)))
      .toNumber();

    const trans = await this.program.methods
      .stake(new BN(transactionAmount))
      .accounts({
        signer: this.provider.wallet.publicKey,
        stakeCurrencyMint: new PublicKey(usdaiAddress),
      })
      .instruction();

    const messageV0 = new TransactionMessage({
      payerKey: this.provider.publicKey,
      recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
      instructions: [...listInstruction, trans],
    }).compileToV0Message(addressLookupTable);

    const transaction = new VersionedTransaction(messageV0);
    const hash = await this.sendTransaction(transaction);

    return hash;
  }

  async withdraw(
    amount: number,
    tokenAddress: string,
    instruction: TransactionInstruction | null,
    addressLookupTable: AddressLookupTableAccount[] = []
  ): Promise<string> {
    const listInstruction = instruction ? [instruction] : [];
    const isHasUserCollateral1 = await this.checkUserCollateral(new PublicKey(tokenAddress));
    const isHasUserUsdaiAccount = await this.checkUserCollateral(new PublicKey(usdaiInfo.address));
    const checkUserCollateralInstruction = [];

    if (isHasUserCollateral1 !== null) {
      checkUserCollateralInstruction.push(isHasUserCollateral1);
    }

    if (isHasUserUsdaiAccount !== null) {
      checkUserCollateralInstruction.push(isHasUserUsdaiAccount);
    }

    const trans = await this.program.methods
      .unstake(new BN(amount * getDecimalToken(usdaiAddress)))
      .accounts({
        signer: this.provider.publicKey,
        stakeCurrencyMint: new PublicKey(usdaiAddress),
      })
      .instruction();

    const messageV0 = new TransactionMessage({
      payerKey: this.provider.publicKey,
      recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
      instructions: [...checkUserCollateralInstruction, trans, ...listInstruction],
    }).compileToV0Message(addressLookupTable);

    const transaction = new VersionedTransaction(messageV0);
    const hash = await this.sendTransaction(transaction);

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
