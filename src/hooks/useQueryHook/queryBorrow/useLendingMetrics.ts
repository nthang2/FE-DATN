import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import useLendingContract from 'src/hooks/useContract/useLendingContract';
import { getLendingMetrics, getLendingMetricsCrossMode } from 'src/services/HandleApi/getLendingMetrics/getLendingMetrics';
import { TLendingMetric } from 'src/services/HandleApi/getLendingMetrics/type';

const useLendingMetrics = () => {
  const wallet = useWallet();
  const { initLendingContract } = useLendingContract();

  const query = useQuery<TLendingMetric>({
    queryKey: ['useLendingMetrics'],
    queryFn: async () => {
      try {
        const contract = initLendingContract(wallet);
        const metrics = await getLendingMetrics();
        const metricsCrossMode = await getLendingMetricsCrossMode();
        const totalSupply = await contract.getTotalSupply();

        return {
          ...metrics,
          marketSize: metrics.marketSize + metricsCrossMode.marketSize,
          totalBorrows: totalSupply,
        };
      } catch (error) {
        console.log('useLendingMetrics error', error);
        return {} as TLendingMetric;
      }
    },
    staleTime: Infinity,
  });

  return query;
};

export default useLendingMetrics;
