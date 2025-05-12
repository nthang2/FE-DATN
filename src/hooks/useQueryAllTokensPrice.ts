import { useQuery } from '@tanstack/react-query';
import { TokenName } from 'src/libs/crypto-icons';
import { listTokenAvailable, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { getTokenPrice } from 'src/services/HandleApi/getPriceToken/getPriceToken';

const usdaiInfo = { [TokenName.USDAI]: mapNameToInfoSolana[TokenName.USDAI] };

// ! This is a custom hook that fetches the price of all tokens
export default function useQueryAllTokensPrice() {
  return useQuery({
    queryKey: ['allTokensPrice'],
    queryFn: async () => {
      const listToken = { ...listTokenAvailable, ...usdaiInfo };
      const arrAddress = Object.keys(listToken).map((item) => {
        const key = item as keyof typeof listToken;
        return listToken?.[key]?.address as string;
      });

      return getTokenPrice(arrAddress);
    },
    staleTime: Infinity,
    refetchInterval: 1000 * 30,
  });
}
