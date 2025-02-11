import { TokenName } from 'crypto-token-icon';
import { TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { BN } from 'src/utils';
import useFetchAllSolTokenBalances from './useFetchAllSolTokenBalances';

export default function useSolanaBalanceToken(address: string, tokenName: TSolanaToken) {
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

export const useSolanaBalanceTokens = (userAddress: string, tokens: TSolanaToken[]) => {
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
