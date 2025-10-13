export type TMyPortfolioAsset = {
  name: string;
  contractAddress: string;
  loanAccount: string;
  decimals: number;
  priceUSD: number;
  rate: number;
  usdaiToRedeem: number;
  depositedAmount: number;
  depositedUSD: number;
  healthFactor: number;
  maxWithdrawable: number;
  maxAvailableToMint?: number;
};

export type TMyPortfolioInfoResp = {
  user: string;
  usdaiToRedeem: number;
  collateralValue: number;
  healthFactor: number;
  loanAccount: string;
  maxAvailableToMint: number;
  assets: TMyPortfolioAsset[];
};

export type TResponseUsdaiInPool = {
  address: string;
  balance: {
    usdc: number;
    usdai: number;
  };
};

export type THealthFactoruniversalBody = {
  chainId: number;
  walletAddress: string;
  tokens: { token: string; amount: number }[];
  mintAmount: number;
};

export type TTransactionHistoryBody = { chainId: string; walletAddress: string; pageIndex: number; pageSize: number };

export type TTransactonHistoryItem = {
  universalWallet: string | null;
  numberOfActions: number;
  actions: Array<{
    actionType: number;
    amount: string;
    chainId: number;
    deadline: number;
    execution?: Array<{
      message: null | string;
      step: string;
      success: boolean;
      timestamp: number;
      tx: string;
    }>;
    nonce: number;
    requestId: number;
    state: string;
    timestamp: number;
    token: string;
    transactionHash: string;
    user: string;
  }>;
};
