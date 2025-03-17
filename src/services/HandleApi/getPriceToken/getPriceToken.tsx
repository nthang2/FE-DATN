import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TokenPriceInfo } from './type';

export type TPriceList = { [key: string]: TokenPriceInfo };

export async function getTokenPrice(tokenAddress: string[]): Promise<TPriceList> {
  const response = await Promise.allSettled(
    tokenAddress.map(async (address) => {
      const resp = await axios.get(apiUrl.getTokenPrice(address));

      return resp.data as TokenPriceInfo;
    })
  );

  // const tempPrice = [5, 1, 12, 1];
  const result = response
    .filter((promise) => promise.status === 'fulfilled')
    .map((resp) => resp.value)
    .reduce((prev, item, index) => {
      const key = item.address;

      if (key) {
        return { ...prev, [key]: { ...item, price: item.price || 1 } };
      }

      return prev;
    }, {} as TPriceList);

  return result;
}
