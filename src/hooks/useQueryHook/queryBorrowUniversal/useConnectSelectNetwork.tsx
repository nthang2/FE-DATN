import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';

const useConnectSelectNetwork = (network: string) => {
  const listWalletSummary = useSummaryConnect();

  return listWalletSummary.find((wallet) => wallet.chainName.toLowerCase() === network.toLowerCase()) || listWalletSummary[0];
};

export default useConnectSelectNetwork;
