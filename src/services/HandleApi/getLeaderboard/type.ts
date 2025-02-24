export type TLiquidationLeaderboardRow = {
  user: string;
  collateral: string;
  collateralAmount: number;
  debtAmount: number;
  collateralValue: number;
  debtValue: number;
  healthFactor: number;
};

export type TLiquidationLeaderboardApiResp = {
  numberOfDocs: number;
  docs: TLiquidationLeaderboardRow[];
};

export type TLiquidationLeaderboardParams = {
  user?: string;
  collateral?: string;
  healthFactorThreshold?: number;
};
