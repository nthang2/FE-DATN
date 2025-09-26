import { TokenName } from 'src/libs/crypto-icons';
import { bnbEthereum, ethEthereum, oraiEthereum, scORAIEthereum, usdaiEthereum, usdcEthereum, usdtEthereum } from '.';
import { EthereumChainTokenInfo } from './EthereumChainTokenInfo';

export const mapNameToInfoEthereum: Record<string, EthereumChainTokenInfo | undefined> = {
  [TokenName.BNB]: bnbEthereum,
  [TokenName.USDC]: usdcEthereum,
  [TokenName.USDT]: usdtEthereum,
  [TokenName.ETH]: ethEthereum,
  [TokenName.scORAI]: scORAIEthereum,
  [TokenName.ORAI]: oraiEthereum,
  [TokenName.USDAI]: usdaiEthereum,
};

export type TEthereumToken = keyof typeof mapNameToInfoEthereum;

export const findTokenNameEthereum: Record<string, TEthereumToken> = {
  [bnbEthereum.address]: TokenName.BNB,
  [usdcEthereum.address]: TokenName.USDC,
  [usdtEthereum.address]: TokenName.USDT,
  [ethEthereum.address]: TokenName.ETH,
  [scORAIEthereum.address]: TokenName.scORAI,
  [oraiEthereum.address]: TokenName.ORAI,
  [usdaiEthereum.address]: TokenName.USDAI,
};

export const findTokenInfoByTokenEVM = (token: string) => {
  const tokenSymbol = findTokenNameEthereum[token];
  if (!tokenSymbol) {
    return null;
  }

  return mapNameToInfoEthereum[tokenSymbol];
};

export const listTokenAvailable = {
  [TokenName.ORAI]: mapNameToInfoEthereum[TokenName.ORAI],
  [TokenName.USDC]: mapNameToInfoEthereum[TokenName.USDC],
  [TokenName.scORAI]: mapNameToInfoEthereum[TokenName.scORAI],
  [TokenName.USDAI]: mapNameToInfoEthereum[TokenName.USDAI],
};
