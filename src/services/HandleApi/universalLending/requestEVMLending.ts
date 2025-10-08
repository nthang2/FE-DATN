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

export const requestEVMLending = async (data: TRequestEVMLendingBody) => {
  const response = await axios.post<TRequestEVMLendingResponse>(apiUrl.universalLendingRequestEVM(), data);
  return response.data;
};
