import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import useLendingContract from 'src/hooks/useContract/useLendingContract';

//This hook not use yet
const useMaxLtv = () => {
  const wallet = useWallet();
  const { initLendingContract, crossMode } = useLendingContract();

  const query = useQuery({
    queryKey: ['getMaxLtv', crossMode],
    queryFn: async () => {
      if (!wallet) return 0;
      const lendingContract = initLendingContract(wallet);

      const maxLtv = (await lendingContract.getMaxLtv()) * 10;
      return maxLtv;
    },
    enabled: Boolean(wallet),
  });

  //change maxLtv = query.data later
  return { maxLtv: query.data, ...query };
};

export default useMaxLtv;
