import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TLendingMetric } from './type';

export async function getLendingMetrics(): Promise<TLendingMetric> {
  const response = await axios.get(apiUrl.getLendingMetrics());
  return response.data as TLendingMetric;
}
