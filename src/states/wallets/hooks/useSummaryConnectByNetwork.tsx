import useSummaryConnect from './useSummaryConnect';
import { blankWallet } from './useSummaryFirstActiveConnect';

interface IProps {
  network: string;
}

const useSummaryConnectByNetwork = ({ network }: IProps) => {
  const listConnectedWallet = useSummaryConnect();

  const result =
    listConnectedWallet.find((wallet) => {
      return wallet.networkName.toLowerCase() === network.toLowerCase();
    }) || blankWallet;

  return result;
};

export default useSummaryConnectByNetwork;
