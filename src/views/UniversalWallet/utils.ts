import { toast } from 'react-toastify';
import {
  TWalletLinkingRequestBody,
  walletLinkingRequest,
  getWalletLinkingRequest,
  TGetWalletLinkingRequestBody,
} from 'src/services/HandleApi/requestToLink/requestToLink';
import { sleep } from 'src/utils';

const RETRY_TIMES = 5;

export const handleWalletLinkingRequest = async (
  walletLinkingRequestInfo: TWalletLinkingRequestBody,
  isNotify: boolean = true,
  retryTimes: number = 0
) => {
  if (retryTimes >= RETRY_TIMES) {
    return;
  }

  await walletLinkingRequest(walletLinkingRequestInfo);
  const response = await getWalletLinkingRequest({
    requestId: walletLinkingRequestInfo.requestId,
    walletAddress: walletLinkingRequestInfo.sourceWallet,
    chainId: walletLinkingRequestInfo.sourceChainId,
  });

  if (isNotify) {
    if (response.state === 'Failed') {
      toast.error('Wallet linking request failed');
    } else if (response.state === 'Success') {
      toast.success('Wallet linking request successful');
    }
  }

  if (response.state === 'Pending' && response?.requestId > 0) {
    await sleep(1000 * 3);
    await handleWalletLinkingRequest(walletLinkingRequestInfo, isNotify, retryTimes + 1);
  }

  return walletLinkingRequestInfo;
};

export const handleRetryGetWalletLinkingRequest = async (data: TGetWalletLinkingRequestBody, retryTimes: number = RETRY_TIMES) => {
  if (retryTimes === 0 || !retryTimes || !data.requestId) {
    return;
  }

  const response = await getWalletLinkingRequest({
    requestId: data.requestId,
    walletAddress: data.walletAddress,
    chainId: data.chainId,
  });

  if (response.state === 'Pending' && response?.requestId > 0) {
    await sleep(1000 * 3);
    await handleRetryGetWalletLinkingRequest(data, retryTimes - 1);
  }

  return response;
};
