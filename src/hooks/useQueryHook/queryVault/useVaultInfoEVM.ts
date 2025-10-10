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
        console.log('🚀 ~ useVaultInfoEVM ~ stakers:', stakers?.toString());
        const rps = Number(result[1].result || 0);
        console.log('🚀 ~ useVaultInfoEVM ~ rps:', rps.toString());
        const minAprBps = Number(result[2].result || 0);
        console.log('🚀 ~ useVaultInfoEVM ~ minAprBps:', minAprBps.toString());
        // [totalStaked, rewardIndex, lastUpdate]
        const vaultInfo = result[3].result;
        console.log('🚀 ~ useVaultInfoEVM ~ vaultInfo:', vaultInfo?.toString());

        const totalStaked = Number(vaultInfo?.[0] || 0);
        console.log('🚀 ~ useVaultInfoEVM ~ totalStaked:', totalStaked.toString());
        const vaultGlobalIndex = Number(vaultInfo?.[1] || 0);
        console.log('🚀 ~ useVaultInfoEVM ~ vaultGlobalIndex:', vaultGlobalIndex.toString());
        const lastUpdate = Number(vaultInfo?.[2] || 0);
        console.log('🚀 ~ useVaultInfoEVM ~ lastUpdate:', lastUpdate.toString());

        const amount = Number(stakers?.[0] || 0);
        console.log('🚀 ~ useVaultInfoEVM ~ amount:', amount.toString());
        const rewardIndex = Number(stakers?.[1] || 0);
        console.log('🚀 ~ useVaultInfoEVM ~ rewardIndex:', rewardIndex.toString());
        const userPendingReward = Number(stakers?.[2] || 0);
        console.log('🚀 ~ useVaultInfoEVM ~ userPendingReward:', userPendingReward.toString());
        const passTime = new Date().getTime() / 1000 - lastUpdate;
        console.log('🚀 ~ useVaultInfoEVM ~ passTime:', passTime.toString());

        const newestPendingReward = BN(rps).multipliedBy(passTime).toNumber();
        console.log('🚀 ~ useVaultInfoEVM ~ newestPendingReward:', newestPendingReward.toString());
        const minRewardPerYear = BN(BN(totalStaked).multipliedBy(passTime).multipliedBy(minAprBps)).dividedBy(BN(10000 * 86400 * 365));
        console.log('🚀 ~ useVaultInfoEVM ~ minRewardPerYear:', minRewardPerYear.toString());
        const globalIndex = vaultGlobalIndex + Math.max(minRewardPerYear.toNumber(), newestPendingReward) / totalStaked;
        console.log('🚀 ~ useVaultInfoEVM ~ globalIndex:', globalIndex.toString());
        const pendingReward = (globalIndex - rewardIndex) * Number(amount) + Number(userPendingReward);
        console.log('🚀 ~ useVaultInfoEVM ~ pendingReward:', pendingReward.toString());

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
