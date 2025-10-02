import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { LendingContractUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingContractUniversal';
import { getLendingMetrics, getLendingMetricsCrossMode } from 'src/services/HandleApi/getLendingMetrics/getLendingMetrics';
import { TLendingMetric } from 'src/services/HandleApi/getLendingMetrics/type';

const useLendingMetricsUniversal = () => {
  const wallet = useWallet();

  const query = useQuery<TLendingMetric>({
    queryKey: ['useLendingMetricsUniversal'],
    queryFn: async () => {
      try {
        const contract = new LendingContractUniversal(wallet);
        const metrics = await getLendingMetrics();
        const metricsCrossMode = await getLendingMetricsCrossMode();
        const totalSupply = await contract.getTotalSupply();

        return {
          ...metrics,
          marketSize: metrics.marketSize + metricsCrossMode.marketSize,
          totalBorrows: totalSupply,
        };
      } catch (error) {
        console.log('useLendingMetricsUniversal error', error);
        return {} as TLendingMetric;
      }
    },
    staleTime: Infinity,
  });

  return query;
};

export default useLendingMetricsUniversal;
