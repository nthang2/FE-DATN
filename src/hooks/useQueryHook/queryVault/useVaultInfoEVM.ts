import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ctrAdsEVM } from 'src/constants/contractAddress/evm';
import { mapNameToInfoEthereum } from 'src/constants/tokens/evm-ecosystem/mapNameToInfoEthereum';
import { vaultAbi } from 'src/contracts/evm/abi/vault';
import useSwitchToSelectedChain from 'src/hooks/useSwitchToSelectedChain';
import { config } from 'src/states/wallets/evm-blockchain/config';
import useSummaryEVMConnect from 'src/states/wallets/evm-blockchain/hooks/useSummaryEVMConnect';
import { BN } from 'src/utils';
import { useVaultSelectedNetwork } from 'src/views/Vaults/state/hooks';
import { readContracts } from 'wagmi/actions';

const usdaiInfo = mapNameToInfoEthereum['USDAI'];

const useVaultInfoEVM = () => {
  const { address, status, networkName } = useSummaryEVMConnect();
  const [selectedNetwork] = useVaultSelectedNetwork();
  const { switchToChainSelected } = useSwitchToSelectedChain();

  const query = useQuery({
    queryKey: ['useVaultInfoEVM', address, networkName, selectedNetwork],
    queryFn: async () => {
      try {
        if (!address) return { amount: 0, rewardIndex: 0, unclaimedReward: 0 };
        await switchToChainSelected();

        const contractParams = {
          address: ctrAdsEVM.vault,
          abi: vaultAbi,
        };

        const result = await readContracts(config, {
          contracts: [
            {
              ...contractParams,
              functionName: 'stakers',
              args: [address as `0x${string}`],
            },
            {
              ...contractParams,
              functionName: 'rps',
              args: [],
            },
            {
              ...contractParams,
              functionName: 'minAprBps',
              args: [],
            },
            {
              ...contractParams,
              functionName: 'vaultInfo',
              args: [],
            },
          ],
        });

        const stakers = result[0].result;
        const rps = Number(result[1].result || 0);
        const minAprBps = Number(result[2].result || 0);
        // [totalStaked, rewardIndex, lastUpdate]
        const vaultInfo = result[3].result;

        const totalStaked = String(vaultInfo?.[0] || 0);
        const vaultGlobalIndex = String(vaultInfo?.[1] || 0);
        const lastUpdate = String(vaultInfo?.[2] || 0);

        const amount = String(stakers?.[0] || 0);
        const rewardIndex = String(stakers?.[1] || 0);
        const userPendingReward = String(stakers?.[2] || 0);
        const passTime = BN(new Date().getTime() / 1000).minus(BN(lastUpdate));

        const newestPendingReward = BN(rps).multipliedBy(passTime);
        const minRewardPerYear = BN(BN(totalStaked).multipliedBy(passTime).multipliedBy(minAprBps)).dividedBy(BN(10000 * 86400 * 365));
        const maxReward = minRewardPerYear.gt(newestPendingReward) ? minRewardPerYear : BN(newestPendingReward);
        const globalIndex = BN(vaultGlobalIndex).plus(maxReward.dividedBy(totalStaked));
        const pendingReward = BN(globalIndex).minus(BN(rewardIndex)).multipliedBy(BN(amount)).plus(BN(userPendingReward));

        return {
          amount: BN(stakers?.[0] || 0)
            .dividedBy(BN(10).pow(usdaiInfo.decimals))
            .toNumber(),
          pendingReward: BN(pendingReward).dividedBy(BN(10).pow(usdaiInfo.decimals)).toNumber(),
        };
      } catch (error) {
        console.log('error', error);
        toast.error('Error fetching vault info: ' + (error as Error).message);
        return { amount: 0, rewardIndex: 0, unclaimedReward: 0 };
      }
    },
    enabled: status === 'Connected' && selectedNetwork.toLowerCase() === networkName.toLowerCase(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return query;
};

export default useVaultInfoEVM;
