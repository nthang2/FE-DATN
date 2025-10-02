import { useCallback, useMemo } from 'react';
import { findTokenInfoByToken as findTokenInfoByTokenSOL } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { findTokenInfoByTokenEVM } from 'src/constants/tokens/evm-ecosystem/mapNameToInfoEthereum';
import useGetAllBalanceEVM from 'src/states/wallets/evm-blockchain/hooks/useGetAllBalanceEVM';
import useFetchAllSolTokenBalances from 'src/states/wallets/solana-blockchain/hooks/useFetchAllSolTokenBalances';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { useSelectedNetworkState } from 'src/views/BorrowCrossChain/state/hooks';
import { BN } from 'src/utils';

const useGetBalanceTokenUniversal = (tokenAddress?: string) => {
  const [selectedNetwork] = useSelectedNetworkState();
  const { address: solanaAddress } = useSummarySolanaConnect();
  const { data: listBalanceEVM } = useGetAllBalanceEVM();
  const { allSlpTokenBalances: listBalanceSOL } = useFetchAllSolTokenBalances(solanaAddress);

  const balance = useMemo(() => {
    if (!tokenAddress) return BN(0);
    const tokenInfo = selectedNetwork === 'ethereum' ? findTokenInfoByTokenEVM(tokenAddress) : findTokenInfoByTokenSOL(tokenAddress);
    if (!tokenInfo) return BN(0);
    if (selectedNetwork === 'ethereum') {
      return listBalanceEVM?.[tokenInfo.symbol];
    }
    return listBalanceSOL.data?.[tokenInfo.symbol];
  }, [selectedNetwork, listBalanceEVM, listBalanceSOL.data, tokenAddress]);

  const getBalance = useCallback(
    (selectedAddress: string) => {
      if (!selectedAddress) return BN(0);
      const tokenInfo =
        selectedNetwork === 'ethereum' ? findTokenInfoByTokenEVM(selectedAddress) : findTokenInfoByTokenSOL(selectedAddress);
      if (!tokenInfo) return BN(0);
      if (selectedNetwork === 'ethereum') {
        return listBalanceEVM?.[tokenInfo.symbol];
      }
      return listBalanceSOL.data?.[tokenInfo.symbol];
    },
    [selectedNetwork, listBalanceEVM, listBalanceSOL.data]
  );

  return { balance, getBalance };
};

export default useGetBalanceTokenUniversal;
