import { useQuery } from '@tanstack/react-query';
import { getTopDepositors } from 'src/services/HandleApi/getDashboardInfo/getMetrics';

const useGetTopDepositor = () => {
  const query = useQuery({
    queryKey: ['useGetTopDepositor'],
    queryFn: async () => {
      const resp = await getTopDepositors();
      return resp;
    },
  });

  return query;
};

export default useGetTopDepositor;
