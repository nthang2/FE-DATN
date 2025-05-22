import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TokenPriceInfo } from './type';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TokenName } from 'src/libs/crypto-icons';

const usdaiPoolAddress = 'HMVKReo9AfxgR5GDbjs5NAyw8hL4eaFu23z7mvJahcqb';
const usdaiTokenInfo = mapNameToInfoSolana[TokenName.USDAI];

export type TPriceList = { [key: string]: TokenPriceInfo };

export const getTokenPriceMeteora = async (tokenAddress: string) => {
  const response = await axios.get(apiUrl.getMeteoraTokenPrice(tokenAddress));
  return response.data as { current_price: number };
};

export async function getTokenPrice(tokenAddress: string[]): Promise<TPriceList> {
  const response = await Promise.allSettled(
    tokenAddress.map(async (address) => {
      const resp = await axios.get(apiUrl.getTokenPrice(address));
      const result = resp.data as TokenPriceInfo;

      if (address === usdaiTokenInfo.address) {
        const respMeteora = await getTokenPriceMeteora(usdaiPoolAddress);
        return { ...result, price: respMeteora.current_price };
      }

      return result;
    })
  );

  // const tempPrice = [5, 1, 12, 1];
  const result = response
    .filter((promise) => promise.status === 'fulfilled')
    .map((resp) => resp.value)
    .reduce((prev, item) => {
      const key = item.address;

      if (key) {
        return { ...prev, [key]: { ...item, price: item.price || 1 } };
      }

      return prev;
    }, {} as TPriceList);

  return result;
}
