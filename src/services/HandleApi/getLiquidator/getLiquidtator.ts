import axios from 'axios';
import { TPoolApr, TUserLiquidatorReward } from './type';
import { apiUrl } from 'src/services/apiUrl';

export const getLiquidatorRewardList = async (userAddress: string): Promise<TUserLiquidatorReward> => {
  const response = await axios.get(apiUrl.getLiquidatorRewardList(userAddress));
  return response.data as TUserLiquidatorReward;
};

export const getPoolApr = async (): Promise<TPoolApr> => {
  const response = await axios.get(apiUrl.getPoolApr());
  return response.data as TPoolApr;
};
