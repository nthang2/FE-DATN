import { useQuery } from '@tanstack/react-query';
import { getTransactionHistory } from 'src/services/HandleApi/getUniversalWallet/getTransactionHistory';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';

export default function useQueryTransactionHistory() {
  const { address, chainId } = useSummaryFirstActiveConnect();

  return useQuery({
    queryKey: ['transactionHistory', address, chainId],
    queryFn: async () => {
      const data = await getTransactionHistory({ walletAddress: address, chainId: chainId });
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
}
