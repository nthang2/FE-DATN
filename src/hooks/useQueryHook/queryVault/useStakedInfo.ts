import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { usdaiSolanaMainnet } from 'src/constants/tokens/solana-ecosystem/solana-mainnet';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';
import { BN, getDecimalToken } from 'src/utils';

const useStakedInfo = () => {
  const wallet = useWallet();

  const query = useQuery({
    queryKey: ['useStakedInfo', wallet.publicKey],
    queryFn: async () => {
      if (!wallet) {
        throw new Error('Not connect wallet');
      }

      const vaultContract = new VaultContract(wallet);
      const { amount, pendingReward } = await vaultContract.getStakedAmount();

      return {
        amount: BN(amount).dividedBy(getDecimalToken(usdaiSolanaMainnet.address)).toString(),
        pendingReward: BN(pendingReward).dividedBy(getDecimalToken(usdaiSolanaMainnet.address)).toString(),
      };
    },
    // enabled: Boolean(wallet.publicKey),
    refetchInterval: 1000 * 60 * 5,
    staleTime: Infinity,
  });

  return { stakeInfo: query.data, ...query };
};

export default useStakedInfo;
