import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract';

const useBorrowRate = () => {
  const wallet = useWallet();

  const query = useQuery({
    queryKey: ['getBorrowRate'],
    queryFn: async () => {
      if (!wallet) return 0;
      const lendingContract = new LendingContract(wallet);

      const borrowRate = await lendingContract.getBorrowRate();
      return borrowRate;
    },
    enabled: Boolean(wallet),
  });

  return { borrowRate: query.data, ...query };
};

export default useBorrowRate;
