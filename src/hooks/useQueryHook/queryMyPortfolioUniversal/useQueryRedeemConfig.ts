import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { LendingContractUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingContractUniversal';
import { getUsdaiInPool } from 'src/services/HandleApi/getMyPortfolioInfo/getUsdaiInPool';

export default function useQueryRedeemConfig(tokenAddress: string) {
  const wallet = useWallet();

  return useQuery({
    queryKey: ['useQueryRedeemConfig', wallet.publicKey, tokenAddress],
    queryFn: async () => {
      try {
        const lendingContract = new LendingContractUniversal(wallet);
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
