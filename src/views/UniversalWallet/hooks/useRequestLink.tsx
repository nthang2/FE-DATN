import { useMutation } from '@tanstack/react-query';
import { ctrAdsEVM } from 'src/constants/contractAddress/evm';
import { universalWalletAbi } from 'src/contracts/evm/abi/universalWallet';
import { config } from 'src/states/wallets/evm-blockchain/config';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import { readContract, writeContract } from 'wagmi/actions';
import { pad } from 'viem';
import { useDestinationWalletState, useGenMessageState } from '../state/hooks';
import { requestToLink, walletLinkingRequest } from 'src/services/HandleApi/requestToLink/requestToLink';
import { sepolia } from 'viem/chains';
import { padAddressSolana, sleep } from 'src/utils';

const useRequestLink = () => {
  const { address: sourceAddress } = useSummaryConnect();
  const [destinationWallet] = useDestinationWalletState();
  const [, setGenMessage] = useGenMessageState();

  const mutation = useMutation({
    mutationFn: async () => {
      let padAddress = '' as `0x${string}`;
      if (destinationWallet.chainId === '2') {
        padAddress = padAddressSolana(destinationWallet.address as `0x${string}`);
      } else {
        padAddress = pad(destinationWallet.address as `0x${string}`, { size: 32 });
      }

      try {
        await writeContract(config, {
          address: ctrAdsEVM.universalWallet as `0x${string}`,
          abi: universalWalletAbi,
          functionName: 'requestLinkWallet',
          args: [padAddress, Number(destinationWallet.chainId), true],
          chainId: sepolia.id,
        });

        await sleep(1000 * 20); // wait 20 seconds

        const walletRequest = await readContract(config, {
          address: ctrAdsEVM.universalWallet as `0x${string}`,
          abi: universalWalletAbi,
          functionName: 'walletLinkingRequests',
          chainId: sepolia.id,
          args: [sourceAddress as `0x${string}`],
        });

        await walletLinkingRequest({
          requestId: Number(walletRequest[0]),
          sourceWallet: sourceAddress,
          sourceChainId: walletRequest[3],
          destinationWallet: destinationWallet.address,
          destinationChainId: walletRequest[4],
          deadline: Number(walletRequest[5]),
          action: walletRequest[6],
        });
        const response = await requestToLink(destinationWallet.chainId, destinationWallet.address);
        setGenMessage(response.message);

        return response.message;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });

  return { ...mutation };
};

export default useRequestLink;
