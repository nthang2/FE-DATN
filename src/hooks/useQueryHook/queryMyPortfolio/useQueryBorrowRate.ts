import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract';

export default function useQueryBorrowRate() {
  const wallet = useWallet();
  return useQuery({
    queryKey: ['borrowRate'],
    queryFn: async () => {
      const lendingContract = new LendingContract(wallet);
      const arrAddress = Object.keys(mapNameToInfoSolana).map((item) => {
        const key = item as keyof typeof mapNameToInfoSolana;
        return mapNameToInfoSolana[key].address;
      });
      const borrowRate = {} as { [key: string]: string };
      await Promise.allSettled(
        arrAddress.map(async (add) => {
          if (wallet.publicKey !== null) {
            const userLoan = lendingContract.getUserLoanByToken(wallet.publicKey, new PublicKey(add));
            const _add = await lendingContract.checkIfPdaExist(new PublicKey(userLoan.pdAddress));
            if (!_add) {
              return;
            } else {
              const _borrowRate = await lendingContract.getBorrowRate(userLoan.pdAddress);
              borrowRate[add] = _borrowRate.toString();
            }
          }
        })
      );

      return borrowRate;
    },
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(wallet.publicKey),
  });
}
