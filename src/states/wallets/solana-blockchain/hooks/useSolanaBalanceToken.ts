import useFetchAllSolTokenBalances from './useFetchAllSolTokenBalances';
import { TokenName } from 'crypto-token-icon';
import { TSolanaMainnetToken } from 'src/constants/tokens/solana-ecosystem/solana-mainnet/mapNameToInfoSolanaMainnet';
import { BN } from 'src/utils';

export default function useSolanaBalanceToken(address: string, tokenName: TSolanaMainnetToken) {
  const { allSlpTokenBalances, native } = useFetchAllSolTokenBalances(address);
  if (tokenName === TokenName.SOL) {
    return native.SOL;
  }

  return {
    balance: allSlpTokenBalances.data?.[tokenName] || BN(0),
    isLoading: allSlpTokenBalances.isLoading,
    isRefetching: allSlpTokenBalances.isFetching,
    refetch: allSlpTokenBalances.refetch,
  };
}

export const useSolanaBalanceTokens = (userAddress: string, tokens: TSolanaMainnetToken[]) => {
  const { allSlpTokenBalances, native } = useFetchAllSolTokenBalances(userAddress);
  return tokens.map((token) => {
    if (token === TokenName.SOL) {
      return native.SOL;
    } else {
      return {
        balance: allSlpTokenBalances.data?.[token] || BN(0),
        isLoading: allSlpTokenBalances.isLoading,
        isRefetching: allSlpTokenBalances.isFetching,
        refetch: allSlpTokenBalances.refetch,
      };
    }
  });
};
