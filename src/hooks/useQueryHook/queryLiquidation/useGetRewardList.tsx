import { useQuery } from '@tanstack/react-query';
import { getLiquidatorRewardList } from 'src/services/HandleApi/getLiquidator/getLiquidtator';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';

const useGetRewardList = () => {
  const { address } = useSummarySolanaConnect();

  const query = useQuery({
    queryKey: ['useGetRewardList', address],
    queryFn: async () => {
      if (!address) return;
      const result = await getLiquidatorRewardList(address);
      return result;
    },
    enabled: !!address,
    staleTime: 1000 * 60 * 10,
  });

  return { ...query, stakedAmount: query.data };
};

export default useGetRewardList;
