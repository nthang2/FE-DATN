export type TLeaderboardRow = {
  debtor: string;
  liquidator: string;
  loanAccount: string;
  collateral: string;
  collateralAmount: number;
  repayAmount: number;
  collateralValue: number;
  repayValue: number;
  transactionHash: string;
  blockNumber: number;
  timestamp: number;
};

export type TLeaderboardApiResp = {
  numberOfDocs: number;
  docs: TLeaderboardRow[];
};

export type TGetLeaderboardData = {
  page: number;
  debtor: string;
  collateral: string;
  itemPerPage: number;
};
