import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { findTokenInfoByToken, listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract';
import { BN } from 'src/utils';

export default function useQueryDepositValue() {
  const wallet = useWallet();
  const arrAddress = Object.keys(listTokenAvailable).map((item) => {
    const key = item as keyof typeof listTokenAvailable;
    return listTokenAvailable[key]?.address;
  });
  return useQuery({
    queryKey: ['depositValue', wallet.publicKey, arrAddress],
    queryFn: async () => {
      const lendingContract = new LendingContract(wallet);
      const depositValue = {} as { [key: string]: string };
      await Promise.allSettled(
        arrAddress.map(async (add) => {
          if (wallet.publicKey !== null && add) {
            const userLoan = lendingContract.getUserLoanByToken(wallet.publicKey, new PublicKey(add));
            const _add = await lendingContract.checkIfPdaExist(new PublicKey(userLoan.pdAddress));
            if (!_add) {
              return;
            } else {
              const _valueDeposit = await lendingContract.getLoanType0(userLoan.pdAddress);
              depositValue[add] = BN(_valueDeposit.collateralAmount)
                .dividedBy(BN(10).pow(findTokenInfoByToken(add)?.decimals ?? 9))
                .toString();
            }
          }
        })
      );
      // const totalDepositValue = Object.values(depositValue).reduce((a, b) => a + Number(b), 0);

      return depositValue;
    },
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(wallet.publicKey),
  });
}
