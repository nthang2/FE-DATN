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
        // const account = await getAccount(connection, pda, undefined, lending.programId)
        const key = item as keyof typeof mapNameToInfoSolana;
        return mapNameToInfoSolana[key].address;
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
      let borrowRate = {} as { [key: string]: string };
      await Promise.all([
        arrAddress.forEach(async (add) => {
          if (wallet.publicKey !== null) {
            // const _add = await lendingContract.checkIfPdaExist(new PublicKey(add));
            // if (_add) {
            const userLoan = lendingContract.getUserLoanByToken(wallet.publicKey, new PublicKey(add));
            const _borrowRate = await lendingContract.getBorrowRate(userLoan.pdAddress);
            borrowRate[add] = _borrowRate.toString();
            // }
          }
        }),
      ]);

      return borrowRate;
    },
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(wallet.publicKey),
  });
}
