import { useQuery } from '@tanstack/react-query';
import { TokenName } from 'src/libs/crypto-icons';
import { listTokenAvailable, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { getTokenPrice } from 'src/services/HandleApi/getPriceToken/getPriceToken';
import { TokenPriceInfo } from 'src/services/HandleApi/getPriceToken/type';
import { useMemo } from 'react';

const usdaiInfo = { [TokenName.USDAI]: mapNameToInfoSolana[TokenName.USDAI] };

// ! This is a custom hook that fetches the price of all tokens
export default function useQueryAllTokensPrice() {
  const query = useQuery({
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

  const priceByTokenName = useMemo(() => {
    return Object.values(query.data || {})?.reduce((acc, curr) => {
      if (!curr || !curr.name) return acc;
      acc[curr.name as TokenName] = curr;
      return acc;
    }, {} as Record<TokenName, TokenPriceInfo>);
  }, [query.data]);

  return { ...query, priceByTokenName };
}
