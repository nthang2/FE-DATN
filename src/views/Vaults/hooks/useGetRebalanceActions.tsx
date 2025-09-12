import { useQuery } from '@tanstack/react-query';
import { getRebalanceActions } from 'src/services/HandleApi/getDashboardInfo/getMetrics';

const useGetRebalanceActions = () => {
  const query = useQuery({
    queryKey: ['useGetRebalanceActions'],
    queryFn: async () => {
      const resp = await getRebalanceActions();
      return resp;
    },
  });

  return query;
};

export default useGetRebalanceActions;
