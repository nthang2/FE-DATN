import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TLiquidationLeaderboardApiResp, TLiquidationLeaderboardParams } from './type';

export const getLiquidationLeaderboardData = async (props: TLiquidationLeaderboardParams) => {
  const { user, collateral, healthFactorThreshold } = props;
  const resp = await axios.get(apiUrl.getLiquidationLeaderboard({ collateral, user, healthFactorThreshold }));

  return resp.data as TLiquidationLeaderboardApiResp;
};
