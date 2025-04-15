import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TJupiterQuoteParam, TJupiterSwapBody, TSwapResp } from './type';

export const getJupiterQuote = async (param: TJupiterQuoteParam) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await axios.get(apiUrl.getJupiterQuote(new URLSearchParams(param as any).toString()));
  return result.data;
};

export const jupiterSwapInstructions = async (swapBody: TJupiterSwapBody) => {
  const result = await axios.post(apiUrl.jupiterSwapInstructions(), swapBody);
  return result.data as TSwapResp;
};
