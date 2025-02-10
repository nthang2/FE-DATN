import axios from 'axios';
import { TokenName } from 'crypto-token-icon';
import { Address } from 'src/constants';
import { findTokenNameSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { apiUrl } from 'src/services/apiUrl';
import { TokenPriceInfo } from './type';

export type TPriceList = { [key in TokenName]: TokenPriceInfo };

export async function getTokenPrice(tokenAddress: Address[]): Promise<TPriceList> {
  const response = await Promise.allSettled(
    tokenAddress.map(async (address) => {
      const resp = await axios.get(apiUrl.getTokenPrice(address));

      return resp.data as TokenPriceInfo;
    })
  );

  const result = response
    .filter((promise) => promise.status === 'fulfilled')
    .map((resp) => resp.value)
    .reduce((prev, item) => {
      const key = findTokenNameSolana[item.address];

      if (key) {
        return { ...prev, [key]: item };
      }

      return prev;
    }, {} as TPriceList);

  return result;
}
