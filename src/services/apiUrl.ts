import { Address } from 'src/constants';
import { BACKEND_URL } from './baseUrl';

export const apiUrl = {
  getTokenPrice: (address: Address) => `${BACKEND_URL}/tokens/price?tokenAddress=${address}`,
};
