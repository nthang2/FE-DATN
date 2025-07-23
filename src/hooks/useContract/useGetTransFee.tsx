import { useWallet } from '@solana/wallet-adapter-react';
import { Transaction } from '@solana/web3.js';
import { useMutation } from '@tanstack/react-query';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract/LendingContract';
import { TokenName } from 'src/libs/crypto-icons';
import { BN } from 'src/utils';
import useQueryAllTokensPrice from '../useQueryAllTokensPrice';

const solanaInfo = mapNameToInfoSolana[TokenName.SOL];

const useGetTransFee = () => {
  const wallet = useWallet();
  const { data: priceList } = useQueryAllTokensPrice();

  const query = useMutation({
    mutationKey: ['useGetTransFee'],
    mutationFn: async (tx?: Transaction) => {
      if (!wallet || !priceList) return 0;
      const contract = new LendingContract(wallet);
      const fee = await contract.getNetWorkFee(tx);
      const priceSol = priceList[solanaInfo.address]?.price || 0;
      const priceFee = BN(priceSol).multipliedBy(fee).div(`1e${solanaInfo.decimals}`).toNumber();

      return priceFee;
    },
  });

  return query;
};

export default useGetTransFee;
