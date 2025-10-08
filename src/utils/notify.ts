import { toast } from 'react-toastify';
import { getWalletLinkingRequest } from 'src/services/HandleApi/requestToLink/requestToLink';
import { requestEVMLending } from 'src/services/HandleApi/universalLending/requestEVMLending';

interface IHandleNotifyEVMProps {
  chainId: number;
  user: string;
  actionType: number;
  token: string;
  amount: number;
}

export const handleNotifyEVM = async (props: IHandleNotifyEVMProps) => {
  const { chainId, user, actionType, token, amount } = props;
  const walletLinkingRequestInfo = await requestEVMLending({
    chainId,
    user,
    actionType,
    token,
    amount,
  });

  const response = await getWalletLinkingRequest({
    requestId: walletLinkingRequestInfo.requestId,
    walletAddress: user,
    chainId,
  });

  if (response.state === 'Failed') {
    toast.error('Wallet linking request failed');
  } else {
    toast.success('Wallet linking request successful');
  }

  return response;
};
