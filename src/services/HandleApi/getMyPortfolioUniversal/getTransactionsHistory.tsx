import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TTransactionHistoryBody, TTransactonHistoryItem } from './type';

export const getTransactionsHistory = async (body: TTransactionHistoryBody) => {
  const resp = await axios.get<TTransactonHistoryItem>(
    apiUrl.getPortfolioCrossTransactionsHistory(body.walletAddress, body.chainId, body.pageIndex, body.pageSize)
  );

  return resp.data;
};
