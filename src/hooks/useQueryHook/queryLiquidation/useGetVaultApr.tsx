import { useQuery } from '@tanstack/react-query';
import { getPoolApr } from 'src/services/HandleApi/getLiquidator/getLiquidtator';

const useGetVaultApr = () => {
  const query = useQuery({
    queryKey: ['useGetVaultApr'],
    queryFn: async () => {
      const result = await getPoolApr();
      return result;
    },
    staleTime: 1000 * 60 * 10,
  });

  return { ...query };
};

export default useGetVaultApr;
