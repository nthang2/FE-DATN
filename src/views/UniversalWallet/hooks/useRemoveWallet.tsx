import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ctrAdsEVM } from 'src/constants/contractAddress/evm';
import { universalWalletAbi } from 'src/contracts/evm/abi/universalWallet';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract/LendingContract';
import { queryClient } from 'src/layout/Layout';
import { requestToLink } from 'src/services/HandleApi/requestToLink/requestToLink';
import { config } from 'src/states/wallets/evm-blockchain/config';
import { sleep } from 'src/utils';
import { pad } from 'viem';
import { sepolia } from 'viem/chains';
import { readContract, writeContract } from 'wagmi/actions';
import { handleWalletLinkingRequest } from '../utils';
import { mapNameNetwork } from 'src/constants/network';
import useSwitchToSelectedChain from 'src/hooks/useSwitchToSelectedChain';

const useRemoveWallet = () => {
  const walletSolana = useWallet();
  const { switchToChainSelected } = useSwitchToSelectedChain();

  const mutation = useMutation({
    mutationKey: ['useRemoveWallet'],
    mutationFn: async ({ wallet, network }: { wallet: string; network: string | number }) => {
      try {
        if (network.toString().toLowerCase() !== mapNameNetwork.ethereum.chainId.toString()) {
          const contractSolana = new LendingContract(walletSolana);
          const transactionHash = await contractSolana.removeUniversalWallet(wallet, Number(network));
          const linkWalletInfo = await contractSolana.getLinkWalletInfo(wallet);

          await handleWalletLinkingRequest(
            {
              requestId: linkWalletInfo.requestId.toNumber(),
              sourceWallet: wallet,
              sourceChainId: linkWalletInfo.sourceChainId,
              destinationWallet: wallet,
              destinationChainId: linkWalletInfo.sourceChainId,
              deadline: linkWalletInfo.deadline.toNumber(),
              action: false,
            },
            true,
            1
          );

          return transactionHash;
        } else {
          const padAddress = pad(wallet as `0x${string}`, { size: 32 });

          await switchToChainSelected();

          await writeContract(config, {
            address: ctrAdsEVM.universalWallet as `0x${string}`,
            abi: universalWalletAbi,
            functionName: 'requestLinkWallet',
            chainId: sepolia.id,
            args: [padAddress, Number(network), false],
          });

          await sleep(1000 * 20); // wait 20 seconds

          const walletRequest = await readContract(config, {
            address: ctrAdsEVM.universalWallet as `0x${string}`,
            abi: universalWalletAbi,
            functionName: 'walletLinkingRequests',
            chainId: sepolia.id,
            args: [wallet as `0x${string}`],
          });

          await handleWalletLinkingRequest(
            {
              requestId: Number(walletRequest[0]),
              sourceWallet: wallet,
              sourceChainId: walletRequest[3],
              destinationWallet: wallet,
              destinationChainId: walletRequest[4],
              deadline: Number(walletRequest[5]),
              action: walletRequest[6],
            },
            true,
            1
          );

          const response = await requestToLink(network.toString(), wallet, wallet, network.toString());
          console.log(response);
        }
      } catch (error) {
        console.log(error);
        toast.error('Remove wallet failed: ' + error);
        throw error;
      }
    },
    onSuccess: async () => {
      await sleep(1000 * 10); // wait 10 seconds
      queryClient.refetchQueries({ queryKey: ['listWalletLinkingRequests'] });
    },
  });

  return mutation;
};

export default useRemoveWallet;
