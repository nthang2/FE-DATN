import { useWallet } from '@solana/wallet-adapter-react';
// import { TSolanaNetworkId } from '../types';
import { mapChainIdToName } from 'src/constants/chainId';
import { IconSOL } from 'src/libs/crypto-icons';
import { walletIcon } from '../../constants/walletIcon';
import { SummaryConnectInfo } from '../../types';

export default function useSummarySolanaConnect(): SummaryConnectInfo {
  const { publicKey, wallet, disconnect } = useWallet();

  return {
    address: publicKey?.toString() || '',
    // chainId: TSolanaNetworkId.sol_devnet as string,
    chainId: mapChainIdToName['solana'],
    chainIcon: IconSOL,
    chainName: 'Solana',
    status: wallet ? (wallet.adapter.connecting ? 'Connecting' : wallet.adapter.connected ? 'Connected' : 'Disconnected') : 'Disconnected',
    walletIcon: wallet ? walletIcon[wallet.adapter.name] || wallet.adapter.icon : undefined,
    walletName: wallet?.adapter.name || '',
    accountName: '',
    disconnect: () => disconnect(),
    networkName: 'Solana',
  };
}
