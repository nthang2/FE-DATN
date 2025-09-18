import useSummaryEVMConnect from '../evm-blockchain/hooks/useSummaryEVMConnect';
import useSummarySolanaConnect from '../solana-blockchain/hooks/useSummarySolanaConnect';
import { chainIcon } from '../constants/chainIcon';

const blankWallet = {
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

const useSummaryConnect = () => {
  const evm = useSummaryEVMConnect();
  const solana = useSummarySolanaConnect();
  const summary = [solana, evm].map((a) => (a.status === 'Connected' ? a : blankWallet));

  return summary;
};

export default useSummaryConnect;
