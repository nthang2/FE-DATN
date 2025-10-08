import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TTransactionHistoryBody, TTransactonHistoryItem } from './type';

export const getTransactionHistory = async (body: TTransactionHistoryBody) => {
  const resp = await axios.get<TTransactonHistoryItem>(apiUrl.getUniversalWalletTransactionHistory(body.walletAddress, body.chainId));

  return resp.data;
};
