import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { listTokenAvailable } from 'src/constants/tokens/evm-ecosystem/mapNameToInfoEthereum';
import { TokenName } from 'src/libs/crypto-icons';
import { BN } from 'src/utils';
import { getBalance } from 'wagmi/actions';
import { config } from '../config';
import useSummaryEVMConnect from './useSummaryEVMConnect';

export type TAppChainIdEVM = 1 | 11155111;

const useGetAllBalanceEVM = () => {
  const { address, chainId } = useSummaryEVMConnect();

  const query = useQuery({
    queryKey: ['useGetAllBalanceEVM', address],
    queryFn: async () => {
      const result: Record<TokenName, BigNumber> = Object.values(listTokenAvailable).reduce((acc, token) => {
        acc[token.symbol] = BN(0);
        return acc;
      }, {} as Record<TokenName, BigNumber>);

      for (const token of Object.values(listTokenAvailable)) {
        const tokenInfo = await getBalance(config, {
          address: address as `0x${string}`,
          token: token.address as `0x${string}`,
          chainId: Number(chainId) as TAppChainIdEVM,
        });

        result[token.symbol] = BN(tokenInfo.value);
      }

      return result;
    },
  });

  return query;
};

export default useGetAllBalanceEVM;
