import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { getMyPortfolioInfo } from 'src/services/HandleApi/getMyPortfolioInfo/getMyPortfolioInfo';

const useMyPortfolio = () => {
  const wallet = useWallet();

  const query = useQuery({
    queryKey: ['useMyPortfolio', wallet.publicKey],
    queryFn: async () => {
      if (!wallet.publicKey) return undefined;
      const resp = await getMyPortfolioInfo(wallet.publicKey?.toString());

      return resp;
    },
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(wallet.publicKey),
  });

  return { ...query, ...query.data };
};

export default useMyPortfolio;
