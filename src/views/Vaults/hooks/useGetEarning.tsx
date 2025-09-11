import { useQuery } from '@tanstack/react-query';
import { getEarningMetrics } from 'src/services/HandleApi/getDashboardInfo/getMetrics';

const useGetEarning = (day?: number) => {
  const query = useQuery({
    queryKey: ['useGetEarning', day],
    queryFn: async () => {
      const resp = await getEarningMetrics(day || 7);
      return resp;
    },
    staleTime: 1000 * 60 * 5,
  });

  return query;
};

export default useGetEarning;
