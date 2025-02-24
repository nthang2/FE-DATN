import { BACKEND_URL } from './baseUrl';
import { TLiquidationLeaderboardParams } from './HandleApi/getLeaderboard/type';

export const apiUrl = {
  getTokenPrice: (address: string) => `${BACKEND_URL}/tokens/price?tokenAddress=${address}`,
  getLendingMetrics: () => `${BACKEND_URL}/lending/metrics`,
  getLiquidationLeaderboard: ({ user, collateral, healthFactorThreshold = 1.1 }: TLiquidationLeaderboardParams) => {
    const _user = user ? `&user=${user}` : '';
    const _collateral = collateral ? `&collateral=${collateral}` : '';
    return `${BACKEND_URL}/lending/liquidates/risk_loans?'${_user}${_collateral}&healthFactorThreshold=${healthFactorThreshold}`;
  },
};
