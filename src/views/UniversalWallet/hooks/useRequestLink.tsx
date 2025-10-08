import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import { ctrAdsEVM } from 'src/constants/contractAddress/evm';
import { isDevNet } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { universalWalletAbi } from 'src/contracts/evm/abi/universalWallet';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract/LendingContract';
import useSwitchToSelectedChain from 'src/hooks/useSwitchToSelectedChain';
import { requestToLink } from 'src/services/HandleApi/requestToLink/requestToLink';
import { config } from 'src/states/wallets/evm-blockchain/config';
import { padAddressSolana, sleep } from 'src/utils';
import { pad } from 'viem';
import { sepolia } from 'viem/chains';
import { readContract, writeContract } from 'wagmi/actions';
import { useDestinationWalletState, useGenMessageState, useSourceWalletState } from '../state/hooks';
import { handleWalletLinkingRequest } from '../utils';
import useEVMContractFee from './useEVMContractFee';
import { queryClient } from 'src/layout/Layout';

const useRequestLink = () => {
  const [sourceWalletState] = useSourceWalletState();
  const { address: sourceAddress, chainId: sourceChainId } = sourceWalletState;
  const walletSolana = useWallet();
  const [destinationWallet] = useDestinationWalletState();
  const [, setGenMessage] = useGenMessageState();
  const { switchToChainSelected } = useSwitchToSelectedChain();
  const { data: ethFee } = useEVMContractFee(); // get eth fee from contract

  const mutation = useMutation({
    mutationFn: async () => {
      let padAddress = '' as `0x${string}`;
      if (destinationWallet.chainId === '2') {
        padAddress = padAddressSolana(destinationWallet.address as `0x${string}`);
      } else {
        padAddress = pad(destinationWallet.address as `0x${string}`, { size: 32 });
      }

      try {
        if (sourceChainId === '2') {
          const contractSolana = new LendingContract(walletSolana);
          await contractSolana.linkWallet(destinationWallet.address, destinationWallet.chainId, true, sourceAddress);

          await sleep(1000 * 5); // wait 5 seconds

          const linkWalletInfo = await contractSolana.getLinkWalletInfo(sourceAddress);
          await handleWalletLinkingRequest({
            requestId: linkWalletInfo.requestId.toNumber(),
            sourceWallet: sourceAddress,
            sourceChainId: linkWalletInfo.sourceChainId,
            destinationWallet: destinationWallet.address,
            destinationChainId: linkWalletInfo.destinationChainId,
            deadline: linkWalletInfo.deadline.toNumber(),
            action: linkWalletInfo.action,
          });

          const response = await requestToLink(destinationWallet.chainId, destinationWallet.address, sourceAddress, sourceChainId);
          setGenMessage(response.message);

          return '';
        } else {
          await switchToChainSelected();

          await writeContract(config, {
            address: ctrAdsEVM.universalWallet as `0x${string}`,
            abi: universalWalletAbi,
            functionName: 'requestLinkWallet',
            args: [padAddress, Number(destinationWallet.chainId), true],
            chainId: isDevNet ? sepolia.id : (Number(sourceWalletState.chainId) as 1 | 11155111),
            value: ethFee,
          });

          await sleep(1000 * 20); // wait 20 seconds

          const walletRequest = await readContract(config, {
            address: ctrAdsEVM.universalWallet as `0x${string}`,
            abi: universalWalletAbi,
            functionName: 'walletLinkingRequests',
            args: [sourceAddress as `0x${string}`],
          });

          await handleWalletLinkingRequest({
            requestId: Number(walletRequest[0]),
            sourceWallet: sourceAddress,
            sourceChainId: walletRequest[3],
            destinationWallet: destinationWallet.address,
            destinationChainId: walletRequest[4],
            deadline: Number(walletRequest[5]),
            action: walletRequest[6],
          });

          const response = await requestToLink(
            destinationWallet.chainId,
            destinationWallet.address,
            sourceAddress,
            walletRequest[3].toString()
          );
          setGenMessage(response.message);

          return '';
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: async () => {
      await sleep(1000 * 10); // wait 10 seconds
      queryClient.refetchQueries({ queryKey: ['listWalletLinkingRequests', sourceWalletState.address, sourceWalletState.chainId] });
    },
  });

  return { ...mutation };
};

export default useRequestLink;
