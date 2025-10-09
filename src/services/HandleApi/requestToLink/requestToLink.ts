import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';

export type TWalletLinkingRequestBody = {
  requestId: number;
  sourceWallet: string;
  sourceChainId: number;
  destinationWallet: string;
  destinationChainId: number;
  deadline: number;
  action: boolean;
};

export type TGetWalletLinkingRequestResponse = {
  requestId: number;
  sourceWallet: string;
  destinationWallet: string;
  sourceChainId: number;
  destinationChainId: number;
  deadline: number;
  action: boolean;
  state: string;
  success?: boolean;
  message?: string;
};

export type TSignMessageBody = {
  walletAddress: string;
  chainId: number;
  signature: string;
};

export type TListWalletLinkingRequests = {
  universalWallet: string;
  firstChainId: number;
  firstWallet: string;
  wallets: {
    key: string;
    chainId: number;
    walletAddress: string;
  }[];
};

export type TGetWalletLinkingRequestBody = {
  requestId: number;
  walletAddress: string;
  chainId: number;
};

export const requestToLink = async (chainId: string, walletAddress: string, sourceWalletAddress: string, sourceChainId: string) => {
  const response = await axios.get<{ message: string }>(apiUrl.generateMessage(chainId, walletAddress, sourceWalletAddress, sourceChainId));
  return response.data;
};

export const walletLinkingRequest = async (body: TWalletLinkingRequestBody) => {
  const response = await axios.post(apiUrl.walletLinkingRequest(), body);
  return response.data;
};

export const getWalletLinkingRequest = async (body: TGetWalletLinkingRequestBody) => {
  const response = await axios.get<TGetWalletLinkingRequestResponse>(apiUrl.walletLinkingRequest(), {
    params: body,
  });
  return response.data;
};

export const handleSignMessageApi = async (body: TSignMessageBody) => {
  const response = await axios.post(apiUrl.signMessage(), body);
  return response.data;
};

export const listWalletLinkingRequests = async (chainId: string, walletAddress: string) => {
  const response = await axios.get<TListWalletLinkingRequests>(apiUrl.listWalletLinkingRequests(chainId, walletAddress));
  return response.data;
};
