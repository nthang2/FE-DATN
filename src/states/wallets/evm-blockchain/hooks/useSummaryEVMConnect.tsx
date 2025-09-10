import { chainIcon } from 'src/states/wallets/constants/chainIcon';
import { walletIcon } from 'src/states/wallets/constants/walletIcon';
import { SummaryConnectInfo, TAppChainId } from 'src/states/wallets/types';
import { useAccount, useChainId } from 'wagmi';

export default function useSummaryEVMConnect(): SummaryConnectInfo {
  const { address, connector, isConnected, isConnecting, chain } = useAccount();
  const chainId = useChainId();

  return {
    address: address?.toString() || '',
    chainId: chainId.toString(),
    chainIcon: chainIcon[chainId.toString() as unknown as TAppChainId],
    chainName: chain?.name || '',
    status: isConnected ? (isConnecting ? 'Connecting' : 'Connected') : 'Disconnected',
    walletIcon: connector ? connector.icon || walletIcon[connector.name] : undefined,
    walletName: connector?.name || '',
    accountName: '',
    disconnect: () => connector?.disconnect(),
    networkName: 'Ethereum',
  };
}
