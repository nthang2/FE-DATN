export type THealthFactorBody = {
  token: string;
  amount: number;
  mintAmount: number;
};

export type THealthFactorTokenInfo = {
  token: string;
  amount: number;
};

export type THealthFactorCrossBody = {
  tokens: THealthFactorTokenInfo[];
  mintAmount: number;
};

export type THealthFactorLiquidationDetails = {
  estimateLiquidationPrice: string | null;
  token: string;
};

export type THealthFactorResp = {
  healthFactor: string | null;
  estimateLiquidationPrice?: string;
  liquidationDetails?: THealthFactorLiquidationDetails[];
};
