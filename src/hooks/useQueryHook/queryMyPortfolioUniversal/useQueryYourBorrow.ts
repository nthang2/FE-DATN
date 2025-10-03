import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LendingContractUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingContractUniversal';
import useLendingContract from 'src/hooks/useContract/useLendingContract';
import { BN } from 'src/utils';

export default function useQueryYourBorrow() {
  const wallet = useWallet();
  const { crossMode } = useLendingContract();
  const arrAddress = Object.keys(listTokenAvailable).map((item) => {
    const key = item as keyof typeof listTokenAvailable;
    return listTokenAvailable[key]?.address;
  });
  return useQuery({
    queryKey: ['yourBorrow', wallet.publicKey, arrAddress, crossMode],
    queryFn: async () => {
      const lendingContract = new LendingContractUniversal(wallet);

      const yourBorrow = {} as { [key: string]: string };
      await Promise.allSettled(
        arrAddress.map(async (add) => {
          if (wallet.publicKey !== null && add) {
            const userLoan = lendingContract.getUserLoanByToken(wallet.publicKey, new PublicKey(add));
            const _add = await lendingContract.checkIfPdaExist(new PublicKey(userLoan.pdAddress));
            if (!_add) {
              return;
            } else {
              const userLoan = lendingContract.getUserLoanByToken(wallet.publicKey, new PublicKey(add));
              const _valueDeposit = await lendingContract.getLoanType0(userLoan.pdAddress);
              yourBorrow[add] = BN(_valueDeposit.mintedAmount).dividedBy(BN(10).pow(6)).toString();
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
