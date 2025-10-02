import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import { useSelectedNetworkState } from 'src/views/BorrowCrossChain/state/hooks';

const useConnectSelectNetwork = () => {
  const [selectedNetwork] = useSelectedNetworkState();
  const listWalletSummary = useSummaryConnect();

  return listWalletSummary.find((wallet) => wallet.chainName.toLowerCase() === selectedNetwork.toLowerCase()) || listWalletSummary[0];
};

export default useConnectSelectNetwork;
