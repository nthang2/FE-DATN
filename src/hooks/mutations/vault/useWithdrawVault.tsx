import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ctrAdsEVM } from 'src/constants/contractAddress/evm';
import { findTokenInfoByToken } from 'src/constants/tokens/mapNameToInfo';
import { vaultRouterAbi } from 'src/contracts/evm/abi/vaultRouter';
import { config } from 'src/states/wallets/evm-blockchain/config';
import useSummaryEVMConnect from 'src/states/wallets/evm-blockchain/hooks/useSummaryEVMConnect';
import { writeContract } from 'wagmi/actions';
import useSwitchToSelectedChain from '../../useSwitchToSelectedChain';
import { BN } from 'src/utils';

const useWithdrawVault = () => {
  const { address, networkName } = useSummaryEVMConnect();
  const { switchToChainSelected } = useSwitchToSelectedChain();
  const query = useMutation({
    mutationKey: ['useWithdrawVault', address, networkName],
    mutationFn: async (param: { amount: number; selectedToken: string }) => {
      const { amount, selectedToken } = param;

      try {
        const tokenInfo = findTokenInfoByToken(selectedToken, networkName);
        if (!address) throw new Error('Not connect wallet');
        if (!tokenInfo) throw new Error('Token not found');

        const amountWithDecimal = BN(amount).multipliedBy(BN(10).pow(tokenInfo.decimals)).toFixed(0);

        await switchToChainSelected();
        const resp = await writeContract(config, {
          address: ctrAdsEVM.vaultRouter,
          abi: vaultRouterAbi,
          functionName: 'unstake',
          args: [BigInt(amountWithDecimal)],
        });

        return resp;
      } catch (error) {
        console.log('error', error);
        toast.error('Error fetching vault info: ' + (error as Error).message);
        return null;
      }
    },
  });

  return query;
};

export default useWithdrawVault;
