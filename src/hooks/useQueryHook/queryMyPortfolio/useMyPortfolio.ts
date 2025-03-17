import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { getMyPortfolioInfo } from 'src/services/HandleApi/getMyPortfolioInfo/getMyPortfolioInfo';
import { useCrossModeState } from 'src/states/hooks';

const useMyPortfolio = () => {
  const wallet = useWallet();
  const [crossMode] = useCrossModeState();

  const query = useQuery({
    queryKey: ['useMyPortfolio', wallet.publicKey, crossMode],
    queryFn: async () => {
      if (!wallet.publicKey) return undefined;
      const resp = await getMyPortfolioInfo(wallet.publicKey?.toString(), crossMode);

      return resp;
    },
    staleTime: 15 * 1000,
    enabled: Boolean(wallet.publicKey),
  });

  return { ...query, ...query.data };
};

export default useMyPortfolio;
