import { useQuery } from '@tanstack/react-query';
import { requestToLink } from 'src/services/HandleApi/requestToLink/requestToLink';
import { useDestinationWalletState, useSourceWalletState } from '../state/hooks';

const useGetGenMessage = () => {
  const [destinationWallet] = useDestinationWalletState();
  const [sourceWallet] = useSourceWalletState();
  const { address: sourceAddress } = sourceWallet;

  const query = useQuery({
    queryKey: ['getGenMessage', destinationWallet.chainId, destinationWallet.address, sourceAddress, sourceWallet.chainId],
    queryFn: async () => {
      const response = await requestToLink(destinationWallet.chainId, destinationWallet.address, sourceAddress, sourceWallet.chainId);

      return response;
    },
    enabled: !!destinationWallet.address && !!sourceAddress && !!sourceWallet.chainId,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  return query;
};

export default useGetGenMessage;
