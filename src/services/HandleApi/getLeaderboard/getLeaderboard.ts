import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TGetLeaderboardData, TLeaderboardApiResp } from './type';

export const handleGetLeaderboardData = async (props: TGetLeaderboardData) => {
  const { page, debtor, collateral, itemPerPage } = props;
  const resp = await axios.get(apiUrl.getLeaderboard(page, debtor, collateral, itemPerPage));

  return resp.data as TLeaderboardApiResp;
};
