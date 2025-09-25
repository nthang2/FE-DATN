import { useQuery } from '@tanstack/react-query';
import { getRebalanceActions } from 'src/services/HandleApi/getDashboardInfo/getMetrics';

const useGetRebalanceActions = (page: number, pageSize: number) => {
  const query = useQuery({
    queryKey: ['useGetRebalanceActions', page],
    queryFn: async () => {
      const resp = await getRebalanceActions(page, pageSize);
      return resp;
    },
  });

  return query;
};

export default useGetRebalanceActions;
