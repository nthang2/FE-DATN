import { useQuery } from '@tanstack/react-query';
import { findTokenInfoByToken } from 'src/constants/tokens/mapNameToInfo';
import { LendingUtilityUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingUtilityUniversal';
import { BN } from 'src/utils';

const useMaxProtocolWithdraw = (selectedTokenAddress: string) => {
  const query = useQuery({
    queryKey: ['maxProtocolWithdraw', selectedTokenAddress],
    queryFn: async () => {
      const tokenInfo = findTokenInfoByToken(selectedTokenAddress);
      if (!tokenInfo) return;

      const lendingContract = new LendingUtilityUniversal();
      const depositoryVault = await lendingContract.getDepositoryVault(selectedTokenAddress);

      return BN(depositoryVault)
        .dividedBy(BN(10).pow(BN(tokenInfo.decimals)))
        .toNumber();
    },
  });

  return query;
};

export default useMaxProtocolWithdraw;
