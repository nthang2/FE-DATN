import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import useLendingContract from 'src/hooks/useContract/useLendingContract';

export default function useQueryRedeemConfig(tokenAddress: string) {
  const wallet = useWallet();
  const { initLendingContract } = useLendingContract();

  return useQuery({
    queryKey: ['useQueryRedeemConfig', wallet.publicKey, tokenAddress],
    queryFn: async () => {
      try {
        const lendingContract = initLendingContract(wallet);
        const redeemConfig = await lendingContract.getRedeemConfig(tokenAddress);
        const depository = await lendingContract.getDepository(tokenAddress);
        const loan = await lendingContract.getLoan(tokenAddress);

        return { redeemConfig, depository, loan };
      } catch (error) {
        console.log('🚀 ~ queryFn: ~ error:', error);
        return {};
      }
    },
  });
}
