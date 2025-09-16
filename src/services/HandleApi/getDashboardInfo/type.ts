export type TMetrics = {
  marketSize: number;
  totalBorrows: number;
  utilizationRate: number;
  debtCeilingPercent: number;
  assets: TMetricItem[];
  convertedAmount: TConvertedAmount[];
};

export type TMetricItem = {
  name: string;
  contractAddress: string;
  decimals: number;
  priceUSD: number;
  depositedAmount: number;
  depositedUSD: number;
};

export type TConvertedAmount = {
  name: string;
  address: string;
  swappedAmount: number;
};

export type TEarningMetrics = {
  data: [
    {
      timestamp: number;
      totalStaked: number;
      earningRate: number;
    }
  ];
};

export type TTopDepositors = {
  numberOfDocs: number;
  data: [
    {
      address: string;
      stakedAmount: number;
    }
  ];
};

export type TAudits = {
  protocol: string;
  auditLink: string;
};

export type TRebalanceActions = {
  total: 10;
  pageIndex: 1;
  pageSize: 10;
  data: [{ actionId: number; txHash: string; action: string; chainId: string; vaultId: string; amount: number; timestamp: number }];
};

export type TVaultsPositions = {
  idleBalances: TIdleBalances;
  vaultPositions: TVaultPositions[];
};

export type TVaultPositions = {
  apy: number;
  chain: string;
  depositToken: string;
  name: string;
  percentage: number;
  pnl: number;
  tvl: number;
  vaultId: string;
};

export type TIdleBalances = {
  0x2105: number;
  0xa4b1: number;
  solana: number;
};

export type TProtocolPositions = {
  percentage: number;
  pnl: number;
  protocol: string;
  tvl: number;
};
