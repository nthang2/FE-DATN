import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';

type TWalletLinkingRequestBody = {
  requestId: number;
  sourceWallet: string;
  sourceChainId: number;
  destinationWallet: string;
  destinationChainId: number;
  deadline: number;
  action: boolean;
};

type TSignMessageBody = {
  walletAddress: string;
  chainId: number;
  signature: string;
};

export const requestToLink = async (chainId: string, walletAddress: string) => {
  const response = await axios.get<{ message: string }>(apiUrl.generateMessage(chainId, walletAddress));
  return response.data;
};

export const walletLinkingRequest = async (body: TWalletLinkingRequestBody) => {
  const response = await axios.post(apiUrl.walletLinkingRequest(), body);
  return response.data;
};

export const handleSignMessageApi = async (body: TSignMessageBody) => {
  const response = await axios.post(apiUrl.signMessage(), body);
  return response.data;
};
