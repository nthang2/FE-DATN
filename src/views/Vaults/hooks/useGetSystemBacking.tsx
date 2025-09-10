import { useQuery } from '@tanstack/react-query';
import { getMetrics, getMetricsCrossMode } from 'src/services/HandleApi/getDashboardInfo/getMetrics';
import { TMetricItem } from 'src/services/HandleApi/getDashboardInfo/type';

const useGetSystemBacking = () => {
  const query = useQuery({
    queryKey: ['useGetSystemBacking'],
    queryFn: async () => {
      const isolateMetrics = await getMetrics();
      const crossModeMetrics = await getMetricsCrossMode();
      let totalConvertedAmount = 0;

      const totalMarketSize = isolateMetrics.marketSize + crossModeMetrics.marketSize;
      const mergeAssets = isolateMetrics.assets.reduce((acc, item) => {
        const itemInCrossMode = crossModeMetrics.assets.find((itemCrossMode) => itemCrossMode.name === item.name);
        const itemInConvertedAmount = isolateMetrics.convertedAmount.find((itemConvertedAmount) => itemConvertedAmount.name === item.name);

        const convertedAmount = itemInConvertedAmount?.swappedAmount ?? 0;
        totalConvertedAmount += convertedAmount;

        return {
          ...acc,
          [item.name]: { ...item, depositedUSD: item.depositedUSD + (itemInCrossMode?.depositedUSD ?? 0) + convertedAmount },
        };
      }, {} as { [key: string]: TMetricItem });

      return {
        marketSize: totalMarketSize + totalConvertedAmount,
        assets: mergeAssets,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
};

export default useGetSystemBacking;
