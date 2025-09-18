import { useQuery } from '@tanstack/react-query';
import { getAudits } from 'src/services/HandleApi/getDashboardInfo/getMetrics';

const useGetAudit = () => {
  const query = useQuery({
    queryKey: ['useGetAudit'],
    queryFn: async () => {
      const resp = await getAudits();
      return resp;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { ...query, totalItems: query.data?.length || 0 };
};

export default useGetAudit;
