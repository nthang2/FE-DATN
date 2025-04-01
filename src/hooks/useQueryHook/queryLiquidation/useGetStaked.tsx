import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { TokenName } from 'crypto-token-icon';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LiquidatorContract } from 'src/contracts/solana/contracts/LiquidatorContract';
import { BN, getDecimalToken } from 'src/utils';

const useGetStaked = () => {
  const wallet = useWallet();

  const query = useQuery({
    queryKey: ['useGetStaked', wallet.publicKey],
    queryFn: async () => {
      if (!wallet) return;

      const contract = new LiquidatorContract(wallet);
      const result = await contract.getStaked();
      const decimal = getDecimalToken(mapNameToInfoSolana[TokenName.USDAI].address);

      return BN(result).dividedBy(decimal).toNumber();
    },
    enabled: !!wallet.publicKey,
  });

  return { ...query, stakedAmount: query.data };
};

export default useGetStaked;
