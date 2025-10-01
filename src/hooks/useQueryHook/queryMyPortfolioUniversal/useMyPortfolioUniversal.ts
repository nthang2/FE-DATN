import { useQuery } from '@tanstack/react-query';
import { getMyPortfolioUniversal } from 'src/services/HandleApi/getMyPortfolioUniversal/getMyPortfolioUniversal';
import { useCrossModeState } from 'src/states/hooks';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';

const useMyPortfolioUniversal = () => {
  const { address, chainId } = useSummaryFirstActiveConnect();
  const [crossMode] = useCrossModeState();

  const query = useQuery({
    queryKey: ['useMyPortfolio', address, crossMode],
    queryFn: async () => {
      if (!address) return undefined;
      const resp = await getMyPortfolioUniversal(address?.toString(), chainId);

      return resp;
    },
    staleTime: 15 * 1000,
    enabled: Boolean(address),
  });

  return { ...query, ...query.data };
};

export default useMyPortfolioUniversal;
