import { useQuery } from '@tanstack/react-query';
import { listWalletLinkingRequests } from 'src/services/HandleApi/requestToLink/requestToLink';

const useGetListWallet = (chainId: string, walletAddress: string) => {
  const query = useQuery({
    queryKey: ['listWalletLinkingRequests', chainId, walletAddress],
    queryFn: async () => await listWalletLinkingRequests(chainId, walletAddress),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
};

export default useGetListWallet;
