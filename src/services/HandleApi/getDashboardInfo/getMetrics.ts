import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TAudits, TEarningMetrics, TMetrics, TProtocolPositions, TRebalanceActions, TTopDepositors, TVaultsPositions } from './type';

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

export const getAudits = async () => {
  const resp = await axios.get(apiUrl.getAudits());
  return resp.data as TAudits[];
};

export const getRebalanceActions = async (page: number, pageSize: number) => {
  const resp = await axios.get(apiUrl.getRebalanceActions(page, pageSize));
  return resp.data as TRebalanceActions;
};

export const getProtocolPositions = async () => {
  const resp = await axios.get(apiUrl.getProtocolPositions());
  return resp.data as TProtocolPositions[];
};

export const getVaultsPositions = async () => {
  const resp = await axios.get(apiUrl.getVaultsPositions());
  return resp.data as TVaultsPositions[];
};
