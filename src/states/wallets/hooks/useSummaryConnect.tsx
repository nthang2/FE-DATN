import useSummaryEVMConnect from '../evm-blockchain/hooks/useSummaryEVMConnect';
import useSummarySolanaConnect from '../solana-blockchain/hooks/useSummarySolanaConnect';

const useSummaryConnect = () => {
  const evm = useSummaryEVMConnect();
  const solana = useSummarySolanaConnect();
  const summary = [solana, evm].find((item) => item.status === 'Connected') || solana;

  return summary;
};

export default useSummaryConnect;
