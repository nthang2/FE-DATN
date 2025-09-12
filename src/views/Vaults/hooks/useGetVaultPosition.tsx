import { useQuery } from '@tanstack/react-query';
import { getVaultsPositions } from 'src/services/HandleApi/getDashboardInfo/getMetrics';

const useGetVaultPosition = () => {
  const query = useQuery({
    queryKey: ['useGetVaultPosition'],
    queryFn: async () => {
      const resp = await getVaultsPositions();
      return resp;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
};

export default useGetVaultPosition;
