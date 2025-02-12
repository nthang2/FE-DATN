import { BACKEND_URL } from './baseUrl';

export const apiUrl = {
  getTokenPrice: (address: string) => `${BACKEND_URL}/tokens/price?tokenAddress=${address}`,
};
