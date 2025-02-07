import axios from 'axios';
import { Address } from 'src/constants';
import { apiUrl } from 'src/services/apiUrl';
import { TokenPriceInfo } from './type';

export async function getTokenPrice(tokenAddress: Address[]): Promise<TokenPriceInfo[]> {
  const response = await Promise.allSettled(
    tokenAddress.map(async (address) => {
      const resp = await axios.get(apiUrl.getTokenPrice(address));

      return resp.data as TokenPriceInfo;
    })
  );

  return response.filter((promise) => promise.status === 'fulfilled').map((resp) => resp.value);
}
