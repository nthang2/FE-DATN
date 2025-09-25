import { useQuery } from '@tanstack/react-query';
import { getProtocolPositions } from 'src/services/HandleApi/getDashboardInfo/getMetrics';

const useGetProtocolPositions = () => {
  const query = useQuery({
    queryKey: ['useGetProtocolPositions'],
    queryFn: async () => {
      const resp = await getProtocolPositions();
      return resp;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
};

export default useGetProtocolPositions;
