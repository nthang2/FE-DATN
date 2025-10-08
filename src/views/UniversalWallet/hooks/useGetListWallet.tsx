import { useQuery } from '@tanstack/react-query';
import { listWalletLinkingRequests } from 'src/services/HandleApi/requestToLink/requestToLink';
import { useSourceNetworkState } from '../state/hooks';

const useGetListWallet = (chainId: string, walletAddress: string) => {
  const [networkState] = useSourceNetworkState();

  const query = useQuery({
    queryKey: ['listWalletLinkingRequests', networkState, walletAddress, chainId],
    queryFn: async () => {
      const chain = chainId ? chainId : networkState === 'solana' ? '2' : '1';
      return await listWalletLinkingRequests(chain, walletAddress);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
};

export default useGetListWallet;
