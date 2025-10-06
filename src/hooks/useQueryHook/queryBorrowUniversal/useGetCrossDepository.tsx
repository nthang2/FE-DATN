import { useQuery } from '@tanstack/react-query';
import { LendingUnityUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingUnityUniversal';

const useGetCrossDepository = () => {
  const query = useQuery({
    queryKey: ['getCrossDepository'],
    queryFn: async () => {
      try {
        const lendingContract = new LendingUnityUniversal();
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
