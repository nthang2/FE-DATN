import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { THealthFactorBody, THealthFactorCrossBody, THealthFactorResp } from './type';

export const getHealthFactor = async (userAddress: string, body: THealthFactorBody) => {
  const resp = await axios.post(apiUrl.getHealthFactor(userAddress), body);

  return resp.data as THealthFactorResp;
};

export const getHealthFactorCrossMode = async (userAddress: string, body: THealthFactorCrossBody) => {
  const resp = await axios.post(apiUrl.getHealthFactorCrossMode(userAddress), body);

  return resp.data as THealthFactorResp;
};
