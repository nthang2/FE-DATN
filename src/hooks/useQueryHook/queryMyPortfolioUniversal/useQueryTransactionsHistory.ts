import { useQuery } from '@tanstack/react-query';
import { getTransactionsHistory } from 'src/services/HandleApi/getMyPortfolioUniversal/getTransactionsHistory';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';

export default function useQueryTransactionsHistory() {
  const { address, chainId } = useSummaryFirstActiveConnect();

  return useQuery({
    queryKey: ['transactionHistory', address, chainId],
    queryFn: async () => {
      const data = await getTransactionsHistory({ walletAddress: 'FBiUi4fEEe2yNXkFLsjL8zvDniTjpfvcyJCSadqxyijf', chainId: '2' });
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
}
