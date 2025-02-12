import { useQuery } from '@tanstack/react-query';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { getTokenPrice } from 'src/services/HandleApi/getPriceToken/getPriceToken';

// ! This is a custom hook that fetches the price of all tokens
export default function useQueryAllTokensPrice() {
  return useQuery({
    queryKey: ['allTokensPrice'],
    queryFn: async () => {
      const arrAddress = Object.keys(mapNameToInfoSolana).map((item) => {
        const key = item as keyof typeof mapNameToInfoSolana;
        return mapNameToInfoSolana[key].address as string;
      });

      return getTokenPrice(arrAddress);
    },
    staleTime: Infinity,
    refetchInterval: 1000 * 60 * 10,
  });
}
