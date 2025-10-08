import { toast } from 'react-toastify';
import {
  TWalletLinkingRequestBody,
  walletLinkingRequest,
  getWalletLinkingRequest,
} from 'src/services/HandleApi/requestToLink/requestToLink';

export const handleWalletLinkingRequest = async (walletLinkingRequestInfo: TWalletLinkingRequestBody) => {
  await walletLinkingRequest(walletLinkingRequestInfo);
  const response = await getWalletLinkingRequest({
    requestId: walletLinkingRequestInfo.requestId,
    walletAddress: walletLinkingRequestInfo.sourceWallet,
    chainId: walletLinkingRequestInfo.sourceChainId,
  });

  if (response.state === 'Failed') {
    toast.error('Wallet linking request failed');
  } else {
    toast.success('Wallet linking request successful');
  }

  return walletLinkingRequestInfo;
};
