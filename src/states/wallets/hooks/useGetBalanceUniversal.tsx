import { useMemo } from 'react';
import { mapNameNetwork } from 'src/constants/network';
import useGetAllBalanceEVM from '../evm-blockchain/hooks/useGetAllBalanceEVM';
import useFetchAllSolTokenBalances from '../solana-blockchain/hooks/useFetchAllSolTokenBalances';
import { TokenName } from 'src/libs/crypto-icons';
import BigNumber from 'bignumber.js';
import { UseQueryResult } from '@tanstack/react-query';

interface IProps {
  address: string;
  network: string;
}

type TBalance = UseQueryResult<Record<TokenName, BigNumber>, Error> & {
  balance: Record<TokenName, BigNumber>;
};

const useGetBalanceUniversal = ({ address, network }: IProps) => {
  const currNetwork = mapNameNetwork[network.toLowerCase()];
  const queryEVM = useGetAllBalanceEVM();
  const querySOL = useFetchAllSolTokenBalances(address);

  const balance = useMemo(() => {
    if (currNetwork.id === 'ethereum') {
      return { ...queryEVM, balance: queryEVM.data };
    }
    return { ...querySOL.allSlpTokenBalances, balance: querySOL.allSlpTokenBalances.data };
  }, [currNetwork.id, queryEVM, querySOL]);

  return balance as TBalance;
};

export default useGetBalanceUniversal;
