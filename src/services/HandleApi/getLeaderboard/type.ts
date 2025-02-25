export type TLiquidationLeaderboardRow = {
  user: string;
  collateralName: string;
  collateralImageUrl: string;
  collateral: string;
  collateralAmount: number;
  debtAmount: number;
  collateralValue: number;
  debtValue: number;
  healthFactor: number;
  repayAmount: number;
  collateralToClaim: number;
};

export type TLiquidationLeaderboardApiResp = {
  numberOfDocs: number;
  docs: TLiquidationLeaderboardRow[];
};

export type TLiquidationLeaderboardParams = {
  user?: string;
  collateral?: string;
  healthFactorThreshold: number;
  sortBy: string;
  reverse: boolean;
  excludeCollateral: string;
};
