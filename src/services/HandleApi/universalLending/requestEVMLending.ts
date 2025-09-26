import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';

type TRequestEVMLendingBody = {
  chainId: number;
  user: string;
  actionType: number;
  token: string;
  amount: number;
};

export const requestEVMLending = async (data: TRequestEVMLendingBody) => {
  const response = await axios.post(apiUrl.universalLendingDepositEVM(), data);
  return response.data;
};
