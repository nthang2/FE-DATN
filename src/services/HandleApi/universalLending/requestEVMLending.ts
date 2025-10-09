import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';

type TRequestEVMLendingBody = {
  chainId: number;
  user: string;
  actionType: number;
  token: string;
  amount: number;
};

export type TRequestEVMLendingResponse = {
  chainId: number;
  requestId: number;
  wallet: string;
};

export type TSimulateTransactionBody = {
  chainId: number;
  user: string;
  actionType: number;
  token: string;
  amount: number;
  nonce: number;
  deadline: number;
  signature: {
    r: string;
    s: string;
    v: number;
  };
};

export type TSimulateTransactionResponse = {
  success: boolean;
  message: string;
};

export const requestEVMLending = async (data: TRequestEVMLendingBody) => {
  const response = await axios.post<TRequestEVMLendingResponse>(apiUrl.universalLendingRequestEVM(), data);
  return response.data;
};

export const simulateTransactionEVM = async (data: TSimulateTransactionBody) => {
  const response = await axios.post<TSimulateTransactionResponse>(apiUrl.simulateTransaction(), data);
  return response.data;
};
