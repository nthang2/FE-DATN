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

        const totalStaked = Number(vaultInfo?.[0] || 0);
        const vaultGlobalIndex = Number(vaultInfo?.[1] || 0);
        const lastUpdate = Number(vaultInfo?.[2] || 0);

        const amount = Number(stakers?.[0] || 0);
        const rewardIndex = Number(vaultInfo?.[1] || 0);
        const userPendingReward = Number(stakers?.[2] || 0);
        const passTime = new Date().getTime() / 1000 - lastUpdate;

        const newestPendingReward = BN(rps).multipliedBy(passTime).toNumber();
        const minRewardPerYear = BN(BN(totalStaked).multipliedBy(passTime).multipliedBy(minAprBps)).dividedBy(BN(10000 * 86400 * 365));
        const globalIndex = vaultGlobalIndex + Math.max(minRewardPerYear.toNumber(), newestPendingReward) / totalStaked;
        const pendingReward = (globalIndex - rewardIndex) * Number(amount) + Number(userPendingReward);

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
