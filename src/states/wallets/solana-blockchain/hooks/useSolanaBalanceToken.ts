import { TokenName } from 'src/libs/crypto-icons';
import { mapNameToInfoSolana, TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { BN } from 'src/utils';
import useFetchAllSolTokenBalances from './useFetchAllSolTokenBalances';
import { solTokenSolana } from 'src/constants/tokens/solana-ecosystem/solana-mainnet';

export default function useSolanaBalanceToken(userAddress: string, tokenName: TSolanaToken) {
  const { allSlpTokenBalances, native } = useFetchAllSolTokenBalances(userAddress);
  if (tokenName === TokenName.SOL) {
    return native.SOL;
  }

  return {
    balance: allSlpTokenBalances.data?.[tokenName] || BN(0),
    isLoading: allSlpTokenBalances.isLoading,
    isRefetching: allSlpTokenBalances.isFetching,
    refetch: allSlpTokenBalances.refetch,
    error: allSlpTokenBalances.error,
  };
}

export const useSolanaBalanceTokens = (userAddress: string, tokens: TSolanaToken[]) => {
  const { allSlpTokenBalances, native } = useFetchAllSolTokenBalances(userAddress);
  return tokens.map((token) => {
    if (token === TokenName.SOL) {
      return { ...native.SOL, address: solTokenSolana.address };
    } else {
      return {
        address: mapNameToInfoSolana[token]?.address,
        balance: allSlpTokenBalances.data?.[token] || BN(0),
        isLoading: allSlpTokenBalances.isLoading,
        isRefetching: allSlpTokenBalances.isFetching,
        refetch: allSlpTokenBalances.refetch,
        error: allSlpTokenBalances.error,
      };
    }
  });
};
