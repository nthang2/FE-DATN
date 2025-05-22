import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import useLendingContract from 'src/hooks/useContract/useLendingContract';
import { getUsdaiInPool } from 'src/services/HandleApi/getMyPortfolioInfo/getUsdaiInPool';

export default function useQueryRedeemConfig(tokenAddress: string) {
  const wallet = useWallet();
  const { initLendingContract } = useLendingContract();

  return useQuery({
    queryKey: ['useQueryRedeemConfig', wallet.publicKey, tokenAddress],
    queryFn: async () => {
      try {
        const lendingContract = initLendingContract(wallet);
        const loan = await lendingContract.getLoan(tokenAddress);
        const usdaiInPool = await getUsdaiInPool();

        return { loan, usdaiInPool };
      } catch (error) {
        console.log('🚀 ~ queryFn: ~ error:', error);
        return {};
      }
    },
  });
}
