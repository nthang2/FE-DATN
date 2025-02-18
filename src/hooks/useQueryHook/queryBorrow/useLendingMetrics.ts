import { useQuery } from '@tanstack/react-query';
import { getLendingMetrics } from 'src/services/HandleApi/getLendingMetrics/getLendingMetrics';
import { TLendingMetric } from 'src/services/HandleApi/getLendingMetrics/type';

const useLendingMetrics = () => {
  const query = useQuery<TLendingMetric>({
    queryKey: ['useLendingMetrics'],
    queryFn: async () => {
      try {
        const metrics = await getLendingMetrics();
        return metrics;
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
