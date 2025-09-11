import { useWallet } from '@solana/wallet-adapter-react';
import { useDestinationNetworkState, useGenMessageState } from '../state/hooks';
import { useMutation } from '@tanstack/react-query';
import { useSignMessage } from 'wagmi';
import { handleSignMessageApi } from 'src/services/HandleApi/requestToLink/requestToLink';
import { toast } from 'react-toastify';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';

const useSignMessageDestination = () => {
  const [genMessage, setGenMessage] = useGenMessageState();
  const [destinationNetwork] = useDestinationNetworkState();
  const { signMessageAsync: signMessageEVM } = useSignMessage();
  const { signMessage: signMessageSolana } = useWallet();
  const { address, chainId } = useSummaryConnect();

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
          await handleSignMessageApi({ walletAddress: address, chainId: Number(chainId), signature: signatureHex });
        } else {
          const signatureEVM = await signMessageEVM({ message: genMessage });
          await handleSignMessageApi({ walletAddress: address, chainId: Number(chainId), signature: signatureEVM });
        }
      } catch (error) {
        console.log(error);
      }

      return true;
    },
    onSuccess: () => {
      toast.success('Signature submitted successfully');
      setGenMessage(undefined);
    },
  });

  return mutation;
};

export default useSignMessageDestination;
