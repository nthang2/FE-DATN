import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract';

const useMaxLtv = () => {
  const wallet = useWallet();

  const query = useQuery({
    queryKey: ['getMaxLtv'],
    queryFn: async () => {
      if (!wallet) return 0;
      const lendingContract = new LendingContract(wallet);

      const maxLtv = (await lendingContract.getMaxLtv()) * 10;
      return maxLtv;
    },
    enabled: Boolean(wallet),
  });

  //change maxLtv = query.data later
  return { maxLtv: query.data, ...query };
};

export default useMaxLtv;
