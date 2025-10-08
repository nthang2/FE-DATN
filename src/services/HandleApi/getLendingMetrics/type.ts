export type TConvertedAmount = {
  address: string;
  name: string;
  swappedAmount: number;
};

export type TLendingMetric = {
  tvl: number;
  marketSize: number;
  totalBorrows: number;
  utilizationRate: number;
  debtCeilingPercent: number;
  convertedAmount: TConvertedAmount[];
};
