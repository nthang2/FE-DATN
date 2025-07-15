import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import useLendingContract from 'src/hooks/useContract/useLendingContract';

const useSwapConfig = () => {
  const wallet = useWallet();
  const { initLendingContract } = useLendingContract();

  const query = useQuery({
    queryKey: ['swap-config'],
    queryFn: async () => {
      if (!wallet) return null;
      const swapConfig = initLendingContract(wallet);

      return await swapConfig.getSwapConfig();
    },
    staleTime: 1000 * 60 * 15,
  });

  return query;
};

export default useSwapConfig;
