import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';
import { BN } from 'src/utils';

const useStakedInfo = () => {
  const wallet = useWallet();

  const query = useQuery({
    queryKey: ['useStakedInfo', wallet.publicKey],
    queryFn: async () => {
      if (!wallet) {
        return {
          amount: '0',
          pendingReward: '0',
        };
      }

      const vaultContract = new VaultContract(wallet);
      const { amount, pendingReward } = await vaultContract.getStakedAmount();

      return {
        amount: BN(amount).dividedBy(1e6).toString(),
        pendingReward: BN(pendingReward).toString(),
      };
    },
    enabled: Boolean(wallet.publicKey),
  });

  return { stakeInfo: query.data, ...query };
};

export default useStakedInfo;
