import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import { useSelectedNetworkDepositState } from 'src/views/BorrowCrossChain/state/hooks';

const useConnectSelectNetwork = () => {
  const [selectedNetwork] = useSelectedNetworkDepositState();
  const listWalletSummary = useSummaryConnect();

  return listWalletSummary.find((wallet) => wallet.chainName.toLowerCase() === selectedNetwork.toLowerCase()) || listWalletSummary[0];
};

export default useConnectSelectNetwork;
