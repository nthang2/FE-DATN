import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TMetrics } from './type';

export const getMetrics = async () => {
  const resp = await axios.get(apiUrl.getMetrics());
  return resp.data as TMetrics;
};

export const getMetricsCrossMode = async () => {
  const resp = await axios.get(apiUrl.getMetricsCrossMode());
  return resp.data as TMetrics;
};
