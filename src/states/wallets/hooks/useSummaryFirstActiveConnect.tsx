import { useDestinationWalletState, useSourceWalletState } from 'src/views/UniversalWallet/state/hooks';
import { defaultSelectWallet } from 'src/views/UniversalWallet/state/state';
import { chainIcon } from '../constants/chainIcon';
import useSummaryEVMConnect from '../evm-blockchain/hooks/useSummaryEVMConnect';
import useSummarySolanaConnect from '../solana-blockchain/hooks/useSummarySolanaConnect';
import { SummaryConnectInfo } from '../types';

const blankWallet: SummaryConnectInfo = {
  address: '',
  chainId: '1', // for now
  chainIcon: chainIcon['1'],
  chainName: '',
  status: 'Disconnected',
  walletIcon: undefined,
  walletName: '',
  accountName: '',
  disconnect: () => {},
  networkName: 'Ethereum',
};

const useSummaryFirstActiveConnect = () => {
  const evm = useSummaryEVMConnect();
  const solana = useSummarySolanaConnect();
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();
  const [sourceWallet, setSourceWallet] = useSourceWalletState();

  const handleDisconnect = (item: SummaryConnectInfo) => {
    if (item.address === sourceWallet.address) setSourceWallet(defaultSelectWallet); // reset source wallet
    if (item.address === destinationWallet.address) setDestinationWallet(defaultSelectWallet); // reset destination wallet
    item.disconnect?.();
  };

  const summary = [solana, evm].map((a) => (a.status === 'Connected' ? { ...a, disconnect: () => handleDisconnect(a) } : blankWallet));

  return summary.find((a) => a.status === 'Connected') || blankWallet;
};

export default useSummaryFirstActiveConnect;
