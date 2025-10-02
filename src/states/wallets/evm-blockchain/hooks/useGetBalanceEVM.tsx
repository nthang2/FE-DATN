import { mapNameToInfoEthereum, TEthereumToken } from 'src/constants/tokens/evm-ecosystem/mapNameToInfoEthereum';
import useSummaryEVMConnect from './useSummaryEVMConnect';
import { BN } from 'src/utils';
import { getBalance } from 'wagmi/actions';
import { config } from '../config';
import { useQuery } from '@tanstack/react-query';

export type TAppChainIdEVM = 1 | 11155111;

const useGetBalanceEVM = (tokenName: string) => {
  const { address, chainId } = useSummaryEVMConnect();
  const tokenInfo = mapNameToInfoEthereum[tokenName];

  const query = useQuery({
    queryKey: ['useGetBalanceEVM', address, tokenName],
    queryFn: async () => {
      const balance = await getBalance(config, {
        address: address as `0x${string}`,
        token: tokenInfo?.address as `0x${string}`,
        chainId: Number(chainId) as TAppChainIdEVM,
      });

      return BN(balance.value);
    },
  });

  if (!address) return { balance: BN(0), isLoading: false, isRefetching: false, refetch: () => {}, error: null };

  return {
    address: mapNameToInfoEthereum[tokenInfo?.symbol as TEthereumToken]?.address,
    balance: query.data || BN(0),
    isLoading: query.isLoading,
    isRefetching: query.isFetching,
    refetch: query.refetch,
    error: query.error,
  };
};

export default useGetBalanceEVM;
