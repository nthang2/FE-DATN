export const FontOxanium = "'Oxanium', serif";

export const ProjectID_WalletConnect = '349c73495596fe0938c2557979bddc8c';

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

export const NETWORK = 'devnet'; //change to mainnet later
