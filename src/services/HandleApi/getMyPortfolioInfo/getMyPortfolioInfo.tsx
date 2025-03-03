import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TMyPortfolioAsset, TMyPortfolioInfoResp } from './type';

export type MyPortfolioInfo = { asset: { [key: string]: TMyPortfolioAsset }; portfolioInfo: TMyPortfolioInfoResp };

export async function getMyPortfolioInfo(userAddress: string): Promise<MyPortfolioInfo> {
  const resp = await axios.get(apiUrl.getMyPortfolioInfo(userAddress));
  const portfolioInfo = resp.data as TMyPortfolioInfoResp;
  const assetByTokenAddress = portfolioInfo.assets.reduce((prev, item) => {
    const key = item.contractAddress;

    if (key) {
      return { ...prev, [key]: { ...item } };
    }

    return prev;
  }, {} as { [key: string]: TMyPortfolioAsset });

  return { portfolioInfo: portfolioInfo, asset: assetByTokenAddress };
}
