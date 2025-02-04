import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { TSolanaNetworkId } from './types';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export const solNetworkIds: Record<TSolanaNetworkId, WalletAdapterNetwork> = {
  sol_devnet: WalletAdapterNetwork.Devnet,
  sol_testnet: WalletAdapterNetwork.Testnet,
  sol_mainnet: WalletAdapterNetwork.Mainnet,
};

export const SYSTEM_PROGRAM_ID = new PublicKey('11111111111111111111111111111111'); // địa chỉ thu phí

const rpc2 = 'https://solana-woker.distilled.ai';
// const rpcDevnet = clusterApiUrl('devnet');

export const solNetworkSelect = WalletAdapterNetwork.Mainnet;
export const publicClientSol = new Connection(rpc2, 'confirmed');
