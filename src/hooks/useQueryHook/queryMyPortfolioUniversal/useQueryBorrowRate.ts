import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LendingContractUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingContractUniversal';
import useLendingContract from 'src/hooks/useContract/useLendingContract';

export default function useQueryBorrowRate() {
  const wallet = useWallet();
  const { crossMode } = useLendingContract();
  const arrAddress = Object.keys(listTokenAvailable).map((item) => {
    const key = item as keyof typeof listTokenAvailable;
    return listTokenAvailable[key]?.address;
  });

  return useQuery({
    queryKey: ['borrowRate', wallet.publicKey, arrAddress, crossMode],
    queryFn: async () => {
      const lendingContract = new LendingContractUniversal(wallet);

      const borrowRate = {} as { [key: string]: string };
      await Promise.allSettled(
        arrAddress.map(async (add) => {
          if (wallet.publicKey !== null && add) {
            const _borrowRate = await lendingContract.getBorrowRate(new PublicKey(add), 1e12);
            borrowRate[add] = _borrowRate.toString();
          }
        })
      );

      return borrowRate;
    },
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(wallet.publicKey),
  });
}
