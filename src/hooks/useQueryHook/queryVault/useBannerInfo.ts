import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';

const useBannerInfo = () => {
  const wallet = useWallet();

  const query = useQuery({
    queryKey: ['useBannerInfo', wallet.publicKey],
    queryFn: async () => {
      try {
        const currWallet = wallet ? wallet : ({} as WalletContextState);

        const vaultContract = new VaultContract(currWallet);
        const { apr, tvl } = await vaultContract.getBannerInfo();

        return {
          apr,
          tvl,
        };
      } catch (error) {
        console.log('🚀 ~ queryFn: ~ error:', error);
        return undefined;
      }
    },
    // enabled: Boolean(wallet.publicKey),
    refetchInterval: 1000 * 60 * 5,
    staleTime: Infinity,
  });

  return { bannerInfo: query.data, ...query };
};

export default useBannerInfo;
