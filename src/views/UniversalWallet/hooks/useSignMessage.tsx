import { useWallet } from '@solana/wallet-adapter-react';
import { useDestinationNetworkState, useDestinationWalletState, useGenMessageState } from '../state/hooks';
import { useMutation } from '@tanstack/react-query';
import { useSignMessage } from 'wagmi';
import { handleSignMessageApi } from 'src/services/HandleApi/requestToLink/requestToLink';
import { toast } from 'react-toastify';

const useSignMessageDestination = () => {
  const [genMessage, setGenMessage] = useGenMessageState();
  const [destinationNetwork] = useDestinationNetworkState();
  const { signMessageAsync: signMessageEVM } = useSignMessage();
  const { signMessage: signMessageSolana } = useWallet();
  const [destinationWallet] = useDestinationWalletState();

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
          await handleSignMessageApi({
            walletAddress: destinationWallet.address,
            chainId: Number(destinationWallet.chainId),
            signature: signatureHex,
          });
        } else {
          const signatureEVM = await signMessageEVM({ message: genMessage });
          await handleSignMessageApi({
            walletAddress: destinationWallet.address,
            chainId: Number(destinationWallet.chainId),
            signature: signatureEVM,
          });
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
