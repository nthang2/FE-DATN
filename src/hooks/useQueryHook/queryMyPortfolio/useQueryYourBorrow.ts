import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { findTokenInfoByToken, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract';
import { BN } from 'src/utils';

export default function useQueryYourBorrow() {
  const wallet = useWallet();
  return useQuery({
    queryKey: ['yourBorrow'],
    queryFn: async () => {
      const lendingContract = new LendingContract(wallet);
      const arrAddress = Object.keys(mapNameToInfoSolana).map((item) => {
        const key = item as keyof typeof mapNameToInfoSolana;
        return mapNameToInfoSolana[key].address;
      });
      const yourBorrow = {} as { [key: string]: string };
      await Promise.allSettled(
        arrAddress.map(async (add) => {
          if (wallet.publicKey !== null) {
            const userLoan = lendingContract.getUserLoanByToken(wallet.publicKey, new PublicKey(add));
            const _add = await lendingContract.checkIfPdaExist(new PublicKey(userLoan.pdAddress));
            if (!_add) {
              return;
            } else {
              const userLoan = lendingContract.getUserLoanByToken(wallet.publicKey, new PublicKey(add));
              const _valueDeposit = await lendingContract.getLoanType0(userLoan.pdAddress);
              yourBorrow[add] = BN(_valueDeposit.mintedAmount)
                .dividedBy(BN(10).pow(findTokenInfoByToken(add)?.decimals ?? 9))
                .toString();
            }
          }
        })
      );

      return yourBorrow;
    },
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(wallet.publicKey),
  });
}
