import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { TMyPortfolioAsset } from 'src/services/HandleApi/getMyPortfolioInfo/type';
import { getMyPortfolioUniversal } from 'src/services/HandleApi/getMyPortfolioUniversal/getMyPortfolioUniversal';
import { useCrossModeState } from 'src/states/hooks';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';

const useMyPortfolioUniversal = () => {
  const { address, chainId } = useSummaryFirstActiveConnect();
  const [crossMode] = useCrossModeState();

  const query = useQuery({
    queryKey: ['useMyPortfolio', address, crossMode, chainId],
    queryFn: async () => {
      if (!address) return undefined;
      const resp = await getMyPortfolioUniversal(address?.toString(), chainId);

      return resp;
    },
    staleTime: 15 * 1000,
    enabled: Boolean(address),
  });

  const assetByTokenName = useMemo(() => {
    return Object.values(query.data?.asset || {}).reduce((acc, curr) => {
      acc[curr.name] = curr;
      return acc;
    }, {} as { [key: string]: TMyPortfolioAsset });
  }, [query.data?.asset]);

  return { ...query, ...query.data, assetByTokenName };
};

export default useMyPortfolioUniversal;
