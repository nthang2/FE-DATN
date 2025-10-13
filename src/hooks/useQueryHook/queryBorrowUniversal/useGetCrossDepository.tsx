import { useQuery } from '@tanstack/react-query';
import { LendingUtilityUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingUtilityUniversal';

const useGetCrossDepository = () => {
  const query = useQuery({
    queryKey: ['getCrossDepository'],
    queryFn: async () => {
      try {
        const lendingContract = new LendingUtilityUniversal();
        const depository = await lendingContract.getAccountType1Depository();
        return depository;
      } catch (error) {
        console.log('🚀 ~ queryFn: ~ error:', error);
        return null;
      }
    },
  });

  return query;
};

export default useGetCrossDepository;
