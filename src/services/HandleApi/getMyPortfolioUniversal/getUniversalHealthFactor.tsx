import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { THealthFactorResp } from '../getHealthFactor/type';
import { THealthFactoruniversalBody } from './type';

export const getUniversalHealthFactor = async (body: THealthFactoruniversalBody) => {
  const resp = await axios.post(apiUrl.getUniversalHealthFactor(), body);

  return resp.data as THealthFactorResp;
};
