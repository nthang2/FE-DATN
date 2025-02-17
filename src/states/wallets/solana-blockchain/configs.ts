import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { TSolanaNetworkId } from './types';
import { NETWORK } from 'src/constants';

export const solNetworkIds: Record<TSolanaNetworkId, WalletAdapterNetwork> = {
  sol_devnet: WalletAdapterNetwork.Devnet,
  sol_testnet: WalletAdapterNetwork.Testnet,
  sol_mainnet: WalletAdapterNetwork.Mainnet,
};

export const SYSTEM_PROGRAM_ID = new PublicKey('11111111111111111111111111111111'); // địa chỉ thu phí

// const rpc2 = 'https://solana-woker.distilled.ai';
// const rpcDevnet = clusterApiUrl('devnet');
export const rpc =
  NETWORK === 'devnet'
    ? clusterApiUrl('devnet')
    : 'https://long-side-pool.solana-mainnet.quiknode.pro/8aaf937c425502838140ffe866be292624fc5fb2';

export const solNetworkSelect = NETWORK === 'devnet' ? WalletAdapterNetwork.Devnet : WalletAdapterNetwork.Mainnet;
export const publicClientSol = new Connection(rpc, 'confirmed');
