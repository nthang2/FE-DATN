import { useWallet } from '@solana/wallet-adapter-react';
import { IconSOL } from 'crypto-token-icon';
import { TSolanaNetworkId } from '../types';
import { SummaryConnectInfo } from '../../types';
import { walletIcon } from '../../constants/walletIcon';

export default function useSummarySolanaConnect(): SummaryConnectInfo {
  const { publicKey, wallet, disconnect } = useWallet();

  return {
    address: publicKey?.toString() || '',
    chainId: TSolanaNetworkId.sol_devnet as string,
    chainIcon: IconSOL,
    chainName: 'Solana',
    status: wallet ? (wallet.adapter.connecting ? 'Connecting' : wallet.adapter.connected ? 'Connected' : 'Disconnected') : 'Disconnected',
    walletIcon: wallet ? walletIcon[wallet.adapter.name] || wallet.adapter.icon : undefined,
    walletName: wallet?.adapter.name || '',
    accountName: '',
    disconnect: () => disconnect(),
  };
}
