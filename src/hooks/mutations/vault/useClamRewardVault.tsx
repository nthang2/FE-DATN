import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ctrAdsEVM } from 'src/constants/contractAddress/evm';
import { vaultRouterAbi } from 'src/contracts/evm/abi/vaultRouter';
import { config } from 'src/states/wallets/evm-blockchain/config';
import useSummaryEVMConnect from 'src/states/wallets/evm-blockchain/hooks/useSummaryEVMConnect';
import { writeContract } from 'wagmi/actions';
import useSwitchToSelectedChain from '../../useSwitchToSelectedChain';

const useClamRewardVault = () => {
  const { address, networkName } = useSummaryEVMConnect();
  const { switchToChainSelected } = useSwitchToSelectedChain();
  const query = useMutation({
    mutationKey: ['useClamRewardVault', address, networkName],
    mutationFn: async () => {
      try {
        if (!address) throw new Error('Not connect wallet');

        await switchToChainSelected();
        const resp = await writeContract(config, {
          address: ctrAdsEVM.vaultRouter,
          abi: vaultRouterAbi,
          functionName: 'claimReward',
          args: [],
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

export default useClamRewardVault;
