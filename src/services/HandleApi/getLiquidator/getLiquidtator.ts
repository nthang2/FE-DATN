import axios from 'axios';
import { TUserLiquidatorReward } from './type';
import { apiUrl } from 'src/services/apiUrl';

export const getLiquidatorRewardList = async (userAddress: string): Promise<TUserLiquidatorReward> => {
  const response = await axios.get(apiUrl.getLiquidatorRewardList(userAddress));
  return response.data as TUserLiquidatorReward;
};
