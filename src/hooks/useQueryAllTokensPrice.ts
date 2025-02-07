import { useQuery } from '@tanstack/react-query';
import { TokenName } from 'crypto-token-icon';
import { Address } from 'src/constants';
import { mapNameToInfoSolanaMainnet } from 'src/constants/tokens/solana-ecosystem/solana-mainnet/mapNameToInfoSolanaMainnet';
import { getTokenPrice } from 'src/services/HandleApi/getPriceToken/getPriceToken';

// ! This is a custom hook that fetches the price of all tokens
export default function useQueryAllTokensPrice() {
  return useQuery({
    queryKey: ['allTokensPrice'],
    queryFn: async () => {
      const arrAddress = [TokenName.TRUMP, TokenName.MAX, TokenName.AI16Z].map((item) => {
        const key = item as keyof typeof mapNameToInfoSolanaMainnet;
        return mapNameToInfoSolanaMainnet[key].address as Address;
      });

      return getTokenPrice(arrAddress);
    },
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60 * 10,
  });
}
