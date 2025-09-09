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
