import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import useLendingContract from 'src/hooks/useContract/useLendingContract';

const useBorrowRate = () => {
  const wallet = useWallet();
  const { initLendingContract, crossMode } = useLendingContract();

  const query = useQuery({
    queryKey: ['getBorrowRate', crossMode],
    queryFn: async () => {
      if (!wallet) return 0;
      const lendingContract = initLendingContract(wallet);

      const borrowRate = await lendingContract.getBorrowRate();
      return borrowRate;
    },
    enabled: Boolean(wallet),
  });

  return { borrowRate: query.data, ...query };
};

export default useBorrowRate;
