import { SvgComponent } from 'src/libs/crypto-icons';

export type TWalletStatus =
  | 'Connected'
  | 'Disconnected'
  | 'Connecting'
  | 'Loading'
  | 'Disconnecting'
  | 'NotFound'
  | 'NotInstalled'
  | 'NotExist'
  | 'Rejected'
  | 'Error';

export type TSolanaId = '1' | '56';
export type TAppChainId = TSolanaId;

export type SummaryConnectInfo = {
  chainId: string;
  chainName: string;
  chainIcon: SvgComponent;
  address: string;
  accountName: string;
  status: TWalletStatus;
  walletName: string;
  walletIcon?: SvgComponent | string;
  disconnect: () => void;
  networkName: string;
};
