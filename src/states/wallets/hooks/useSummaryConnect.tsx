import {
  useDestinationNetworkState,
  useDestinationWalletState,
  useSourceNetworkState,
  useSourceWalletState,
} from 'src/views/UniversalWallet/state/hooks';
import { defaultSelectWallet } from 'src/views/UniversalWallet/state/state';
import useSummaryEVMConnect from '../evm-blockchain/hooks/useSummaryEVMConnect';
import useSummarySolanaConnect from '../solana-blockchain/hooks/useSummarySolanaConnect';
import { SummaryConnectInfo } from '../types';

const useSummaryConnect = () => {
  const evm = useSummaryEVMConnect();
  const solana = useSummarySolanaConnect();
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();
  const [sourceWallet, setSourceWallet] = useSourceWalletState();
  const [, setDestinationNetwork] = useDestinationNetworkState();
  const [, setSourceNetwork] = useSourceNetworkState();

  const handleDisconnect = (item: SummaryConnectInfo) => {
    if (item.address === sourceWallet.address) {
      setSourceWallet(defaultSelectWallet);
      setSourceNetwork('');
    } // reset source wallet
    if (item.address === destinationWallet.address) {
      setDestinationWallet(defaultSelectWallet);
      setDestinationNetwork('');
    } // reset destination wallet
    item.disconnect?.();
  };

  const summary = [solana, evm].map((a) => (a.status === 'Connected' ? { ...a, disconnect: () => handleDisconnect(a) } : a));

  return summary;
};

export default useSummaryConnect;
