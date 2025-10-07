import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ctrAdsEVM } from 'src/constants/contractAddress/evm';
import { findTokenInfoByToken } from 'src/constants/tokens/mapNameToInfo';
import { vaultRouterAbi } from 'src/contracts/evm/abi/vaultRouter';
import { config } from 'src/states/wallets/evm-blockchain/config';
import useSummaryEVMConnect from 'src/states/wallets/evm-blockchain/hooks/useSummaryEVMConnect';
import { BN } from 'src/utils';
import { readContract, writeContract } from 'wagmi/actions';
import useSwitchToSelectedChain from '../../useSwitchToSelectedChain';
import { erc20Abi } from 'viem';

const useDepositVault = () => {
  const { address, networkName } = useSummaryEVMConnect();
  const { switchToChainSelected } = useSwitchToSelectedChain();
  const query = useMutation({
    mutationKey: ['useDepositVault', address, networkName],
    mutationFn: async (param: { amount: number; selectedToken: string }) => {
      const { amount, selectedToken } = param;

      try {
        const tokenInfo = findTokenInfoByToken(selectedToken, networkName);
        if (!address) throw new Error('Not connect wallet');
        if (!tokenInfo) throw new Error('Token not found');

        const amountWithDecimal = BN(amount).multipliedBy(BN(10).pow(tokenInfo.decimals)).toFixed(0);

        await switchToChainSelected();

        const allowance = await readContract(config, {
          abi: erc20Abi,
          address: tokenInfo?.address as `0x${string}`,
          functionName: 'allowance',
          args: [address as `0x${string}`, ctrAdsEVM.vaultRouter as `0x${string}`],
        });

        if (allowance < BigInt(amountWithDecimal)) {
          await writeContract(config, {
            abi: erc20Abi,
            address: tokenInfo?.address as `0x${string}`,
            functionName: 'approve',
            args: [ctrAdsEVM.vaultRouter as `0x${string}`, BigInt(amountWithDecimal)],
          });
        }

        const resp = await writeContract(config, {
          address: ctrAdsEVM.vaultRouter,
          abi: vaultRouterAbi,
          functionName: 'stake',
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

export default useDepositVault;
