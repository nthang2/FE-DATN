export const FontOxanium = "'Oxanium', serif";

export const ProjectID_WalletConnect = '349c73495596fe0938c2557979bddc8c';

export const NETWORK: 'mainnet' | 'devnet' = 'devnet'; //change to mainnet later

export const defaultRpc =
  NETWORK === 'devnet'
    ? 'https://rpc.ankr.com/solana_devnet/8cb7e20d1f00146c56101888eb894779d8e88f455eb61fb3e772f3ccddc66661'
    : 'https://solana-woker.distilled.ai/';

export const MAXIMUM_ALLOW = '999999999999999999999999999999';

export enum FetchStatus {
  LOADING = 'isLoading',
  FETCHING = 'isFetching',
  SUCCESS = 'isSuccess',
  ERROR = 'isError',
  IDLE = 'isIdle',
  REFETCHING = 'isRefetching',
  PENDING = 'isPending',
}

export type Address = `0x${string}`;
