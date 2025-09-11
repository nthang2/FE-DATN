import { useWallet } from '@solana/wallet-adapter-react';
import { useDestinationNetworkState, useGenMessageState, useSourceWalletState } from '../state/hooks';
import { useMutation } from '@tanstack/react-query';
import { useSignMessage } from 'wagmi';
// import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import { handleSignMessageApi } from 'src/services/HandleApi/requestToLink/requestToLink';
import { toast } from 'react-toastify';

const useSignMessageDestination = () => {
  const [genMessage, setGenMessage] = useGenMessageState();
  const [destinationNetwork] = useDestinationNetworkState();
  const [sourceWallet] = useSourceWalletState();
  const { signMessageAsync: signMessageEVM } = useSignMessage();
  const { signMessage: signMessageSolana } = useWallet();
  // const { address, chainId } = useSummaryConnect();

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
          await handleSignMessageApi({ walletAddress: sourceWallet, chainId: Number(1), signature: signatureHex });
        } else {
          const signatureEVM = await signMessageEVM({ message: genMessage });
          await handleSignMessageApi({ walletAddress: sourceWallet, chainId: Number(1), signature: signatureEVM });
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
