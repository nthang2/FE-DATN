import { BACKEND_URL, URL_JUPITER_API, URL_METEORA_API } from './baseUrl';
import { TLiquidationLeaderboardParams } from './HandleApi/getLeaderboard/type';

export const apiUrl = {
  getTokenPrice: (address: string) => `${BACKEND_URL}/tokens/price?tokenAddress=${address}`,
  getLendingMetrics: () => `${BACKEND_URL}/lending/metrics`,
  getLendingMetricsCrossMode: () => `${BACKEND_URL}/lending/metrics/cross-mode`,
  getLiquidationLeaderboard: ({
    user,
    collateral,
    healthFactorThreshold,
    sortBy,
    reverse,
    excludeCollateral,
  }: TLiquidationLeaderboardParams) => {
    const _user = user ? `&user=${user}` : '';
    const _collateral = collateral ? `&collateral=${collateral}` : '';
    // eslint-disable-next-line no-extra-boolean-cast
    const checkFinalParam = Boolean(_user || _collateral) ? '' : '&';
    return `${BACKEND_URL}/lending/liquidates/risk_loans?'${_user}${_collateral}${checkFinalParam}&healthFactorThreshold=${healthFactorThreshold}&sortBy=${sortBy}&reverse=${reverse}&excludeCollateral=${excludeCollateral}`;
  },
  getMyPortfolioInfo: (userAddress: string) => `${BACKEND_URL}/lending/users/${userAddress}`,
  getMyPortfolioCrossModeInfo: (userAddress: string) => `${BACKEND_URL}/lending/users/${userAddress}/cross-mode`,
  getLiquidatorRewardList: (userAddress: string) => `${BACKEND_URL}/liquidator-pool/users/${userAddress}`,
  getJupiterQuote: (param: string) => `${URL_JUPITER_API}/quote?${param}`,
  jupiterSwapInstructions: () => `${URL_JUPITER_API}/swap-instructions`,
  getUsdaiInPool: () => `${BACKEND_URL}/tokens/usdai/liquidity-pool`,
  getMeteoraTokenPrice: (tokenAddress: string) => `${URL_METEORA_API}/pair/${tokenAddress}`,
  getPoolApr: () => `${BACKEND_URL}/liquidator-pool/apr`,
  getHealthFactor: (userAddress: string) => `${BACKEND_URL}/lending/users/${userAddress}/health-factor`,
  getHealthFactorCrossMode: (userAddress: string) => `${BACKEND_URL}/lending/users/${userAddress}/cross-mode/health-factor`,

  // Dashboard
  getMetrics: () => `${BACKEND_URL}/lending/metrics`,
  getMetricsCrossMode: () => `${BACKEND_URL}/lending/metrics/cross-mode`,
};
