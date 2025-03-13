import axios from 'axios';
import { apiUrl } from 'src/services/apiUrl';
import { TMyPortfolioAsset, TMyPortfolioInfoResp } from './type';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TokenName } from 'crypto-token-icon';

export type MyPortfolioInfo = { asset: { [key: string]: TMyPortfolioAsset }; portfolioInfo: TMyPortfolioInfoResp };

export async function getMyPortfolioInfo(userAddress: string, crossMode: boolean): Promise<MyPortfolioInfo> {
  const resp = await axios.get(crossMode ? apiUrl.getMyPortfolioCrossModeInfo(userAddress) : apiUrl.getMyPortfolioInfo(userAddress));
  const portfolioInfo = resp.data as TMyPortfolioInfoResp;
  const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];

  const assetByTokenAddress = portfolioInfo.assets.reduce((prev, item) => {
    const key = item.contractAddress;

    if (key) {
      return { ...prev, [key]: { ...item } };
    }

    return prev;
  }, {} as { [key: string]: TMyPortfolioAsset });

  //Create assets value for usdai in cross mode
  assetByTokenAddress[usdaiInfo.address] = {
    contractAddress: usdaiInfo.address,
    decimals: usdaiInfo.decimals,
    maxWithdrawable: portfolioInfo.maxAvailableToMint,
    name: usdaiInfo.symbol,
    loanAccount: portfolioInfo.loanAccount,
    usdaiToRedeem: portfolioInfo.usdaiToRedeem,
    depositedAmount: 0,
    depositedUSD: 0,
    priceUSD: 1,
    rate: 1,
    healthFactor: portfolioInfo.healthFactor,
  } as TMyPortfolioAsset;

  return { portfolioInfo: portfolioInfo, asset: assetByTokenAddress };
}
