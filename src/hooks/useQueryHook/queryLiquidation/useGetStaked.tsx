import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { LiquidatorContract } from 'src/contracts/solana/contracts/LiquidatorContract';

const useGetStaked = () => {
  const wallet = useWallet();

  const query = useQuery({
    queryKey: ['useGetStaked', wallet.publicKey],
    queryFn: async () => {
      if (!wallet) return;

      const contract = new LiquidatorContract(wallet);
      const result = await contract.getStaked();

      return result;
    },
    enabled: !!wallet.publicKey,
  });

  return { ...query, stakedAmount: query.data };
};

export default useGetStaked;
