import { apiUrl } from 'src/services/apiUrl';
import { TResponseUsdaiInPool } from './type';
import axios from 'axios';

export const getUsdaiInPool = async () => {
  const response = await axios.get(apiUrl.getUsdaiInPool());
  const data = await response.data;

  return data as TResponseUsdaiInPool;
};
