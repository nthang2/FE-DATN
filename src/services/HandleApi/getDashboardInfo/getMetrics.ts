import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TEarningMetrics, TMetrics, TTopDepositors } from './type';

export const getMetrics = async () => {
  const resp = await axios.get(apiUrl.getMetrics());
  return resp.data as TMetrics;
};

export const getMetricsCrossMode = async () => {
  const resp = await axios.get(apiUrl.getMetricsCrossMode());
  return resp.data as TMetrics;
};

export const getEarningMetrics = async (day: number) => {
  const resp = await axios.get(apiUrl.getEarningMetrics(day));
  return resp.data as TEarningMetrics;
};

export const getTopDepositors = async () => {
  const resp = await axios.get(apiUrl.getTopDepositors());
  return resp.data as TTopDepositors;
};
