import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import { disconnect as disconnectEVM, signMessage } from '@wagmi/core';
import { toast } from 'react-toastify';
import useSwitchToSelectedChain from 'src/hooks/useSwitchToSelectedChain';
import { queryClient } from 'src/layout/Layout';
import { handleSignMessageApi } from 'src/services/HandleApi/requestToLink/requestToLink';
import { config, configUniversalWallet } from 'src/states/wallets/evm-blockchain/config';
import { useDestinationNetworkState, useDestinationWalletState, useGenMessageState } from '../state/hooks';
import { handleRetryGetWalletLinkingRequest } from '../utils';

const useSignMessageDestination = () => {
  const [genMessage, setGenMessage] = useGenMessageState();
  const [destinationNetwork] = useDestinationNetworkState();
  const { signMessage: signMessageSolana, disconnect: disconnectSolana } = useWallet();
  const [destinationWallet] = useDestinationWalletState();
  const { switchToChainSelected } = useSwitchToSelectedChain();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!genMessage) return;
      try {
        if (destinationNetwork === 'solana') {
          const encodedMessage = new TextEncoder().encode(genMessage);
          const signatureSolana = await signMessageSolana?.(encodedMessage);
          const signatureHex = Array.from(signatureSolana || [])
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');
          const resp = await handleSignMessageApi({
            walletAddress: destinationWallet.address,
            chainId: Number(destinationWallet.chainId),
            signature: signatureHex,
          });

          await handleRetryGetWalletLinkingRequest({
            requestId: resp.requestId,
            walletAddress: resp.sourceWallet,
            chainId: resp.sourceChainId,
          });
        } else {
          await switchToChainSelected();

          const signatureEVM = await signMessage(config, { message: genMessage });
          const resp = await handleSignMessageApi({
            walletAddress: destinationWallet.address,
            chainId: Number(destinationWallet.chainId),
            signature: signatureEVM,
          });

          await handleRetryGetWalletLinkingRequest({
            requestId: resp.requestId,
            walletAddress: resp.sourceWallet,
            chainId: resp.sourceChainId,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error('Signature submitted failed: ' + error);
        throw error;
      }

      return true;
    },
    onSuccess: () => {
      toast.success('Signature submitted successfully');
      queryClient.invalidateQueries({ queryKey: ['listWalletLinkingRequests'] });
      setGenMessage(undefined);
      if (destinationNetwork === 'solana') {
        disconnectSolana();
      } else {
        disconnectEVM(configUniversalWallet);
      }
    },
  });

  return mutation;
};

export default useSignMessageDestination;
