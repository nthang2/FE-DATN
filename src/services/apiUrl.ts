import { BACKEND_URL } from './baseUrl';

export const apiUrl = {
  getTokenPrice: (address: string) => `${BACKEND_URL}/tokens/price?tokenAddress=${address}`,
  getLendingMetrics: () => `${BACKEND_URL}/lending/metrics`,
  getLeaderboard: (page: number, debtor: string, collateral: string, itemPerPage: number) =>
    `${BACKEND_URL}/lending/liquidates/liquidated?collateral=${collateral}&debtor=${debtor}&pageIndex=${page}&pageSize=${itemPerPage}`,
};
