import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract/LendingContract';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from '../useQueryAllTokensPrice';
import { TokenName } from 'src/libs/crypto-icons';
import { BN } from 'src/utils';

const solanaInfo = mapNameToInfoSolana[TokenName.SOL];

const useGetTransFee = () => {
  const wallet = useWallet();
  const { data: priceList } = useQueryAllTokensPrice();

  const query = useQuery({
    queryKey: ['useGetTransFee'],
    queryFn: async () => {
      if (!wallet || !priceList) return 0;
      const contract = new LendingContract(wallet);
      const fee = await contract.getNetWorkFee();
      const priceSol = priceList[solanaInfo.address]?.price || 0;
      const priceFee = BN(priceSol).multipliedBy(fee).div(`1e${solanaInfo.decimals}`).toNumber();

      return priceFee;
    },
  });

  return query;
};

export default useGetTransFee;
