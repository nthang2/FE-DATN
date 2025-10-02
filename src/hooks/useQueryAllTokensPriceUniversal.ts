import { useQuery } from '@tanstack/react-query';
import { listTokenAvailableUniversal } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { getTokenPrice } from 'src/services/HandleApi/getPriceToken/getPriceToken';

export default function useQueryAllTokensPriceUniversal() {
  return useQuery({
    queryKey: ['allTokensPriceUniversal'],
    queryFn: async () => {
      const listToken = { ...listTokenAvailableUniversal };
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
