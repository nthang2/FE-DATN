import { useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';

const useBannerInfo = () => {
  const wallet = useWallet();

  const query = useQuery({
    queryKey: ['useBannerInfo', wallet.publicKey],
    queryFn: async () => {
      const currWallet = wallet ? wallet : ({} as WalletContextState);

      const vaultContract = new VaultContract(currWallet);
      const { apr, tvl } = await vaultContract.getBannerInfo();

      return {
        apr,
        tvl,
      };
    },
    // enabled: Boolean(wallet.publicKey),
    refetchInterval: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  });

  return { bannerInfo: query.data, ...query };
};

export default useBannerInfo;
