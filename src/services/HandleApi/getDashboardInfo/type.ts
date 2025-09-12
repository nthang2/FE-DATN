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
  actionId: number;
  txHash: string;
  action: string;
  chainId: string;
  vaultId: string;
  amount: number;
  timestamp: number;
};

export type TProtocolPositions = {
  protocol: string;
  tvl: number;
  percentage: number;
  pnl: number;
};

export type TVaultsPositions = {
  vaultId: string;
  name: string;
  tvl: number;
  percentage: number;
  pnl: number;
};
