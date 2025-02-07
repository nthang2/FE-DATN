import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { publicClientSol } from '../configs';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import BigNumber from 'bignumber.js';
import { TokenName } from 'crypto-token-icon';
import { BN, DEC } from 'src/utils';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';

export default function useFetchAllSolTokenBalances(addressUser: string) {
  const nativeSolBalance = useNativeSolBalance(addressUser);
  const allSlpTokenBalances = useAllSlpTokenBalances(addressUser);
  return {
    native: {
      [TokenName.SOL]: {
        balance: nativeSolBalance.data || BN(0),
        isLoading: nativeSolBalance.isLoading,
        isRefetching: nativeSolBalance.isFetching,
        refetch: nativeSolBalance.refetch,
      },
    },
    allSlpTokenBalances,
  };
}

function useNativeSolBalance(addressUser: string) {
  return useQuery({
    queryKey: ['solana', 'native-sol-balance', addressUser],
    queryFn: async () => {
      const publicKey = new PublicKey(addressUser);
      const balance = await publicClientSol.getBalance(publicKey);
      return BN(balance).div(DEC(9));
    },
    enabled: !!addressUser,
    staleTime: 1000 * 60 * 5,
  });
}
function useAllSlpTokenBalances(addressUser: string) {
  return useQuery({
    queryKey: ['solana', 'all-slp-token-balances', addressUser],
    queryFn: async () => {
      const publicKey = new PublicKey(addressUser);
      const tokenAccounts = await publicClientSol.getParsedTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      });
      const result: { [k in TokenName]?: BigNumber } = {};

      for (const tokenAccount of tokenAccounts.value) {
        const token = tokenAccount.account.data.parsed.info.mint;
        const tokenName = findTokenInfoByToken(token)?.symbol || token;
        const balance = BN(tokenAccount.account.data.parsed.info.tokenAmount.uiAmount);
        result[tokenName as TokenName] = balance;
      }

      return result;
    },
    enabled: !!addressUser,
    staleTime: 1000 * 60 * 5,
  });
}
