export type TLiquidatorCollateral = {
  collateralToken: string;
  collateralAddress: string;
  reward: number;
  rewardUSD: number;
};

export type TUserLiquidatorReward = {
  user: string;
  deposit: number;
  maxWithdrawable: number;
  collaterals: TLiquidatorCollateral[];
};

export type TPoolApr = {
  startTimestamp: number;
  endTimestamp: number;
  rewardInUSD: number;
  apr: number;
};
