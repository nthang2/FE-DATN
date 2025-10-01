import { TokenName } from 'src/libs/crypto-icons';
import { bnbEthereum, usdcEthereum, usdtEthereum, ethEthereum, scORAIEthereum, oraiEthereum, usdaiEthereum } from '.';
import { EthereumChainTokenInfo } from './EthereumChainTokenInfo';

export const mapNameToInfoEthereumMainnet: Record<string, EthereumChainTokenInfo | undefined> = {
  [TokenName.BNB]: bnbEthereum,
  [TokenName.USDC]: usdcEthereum,
  [TokenName.USDT]: usdtEthereum,
  [TokenName.ETH]: ethEthereum,
  [TokenName.scORAI]: scORAIEthereum,
  [TokenName.ORAI]: oraiEthereum,
  [TokenName.USDAI]: usdaiEthereum,
};

export type TEthereumToken = keyof typeof mapNameToInfoEthereumMainnet;

export const findTokenNameEthereumMainnet: Record<string, TEthereumToken> = {
  [bnbEthereum.address]: TokenName.BNB,
  [usdcEthereum.address]: TokenName.USDC,
  [usdtEthereum.address]: TokenName.USDT,
  [ethEthereum.address]: TokenName.ETH,
  [scORAIEthereum.address]: TokenName.scORAI,
  [oraiEthereum.address]: TokenName.ORAI,
  [usdaiEthereum.address]: TokenName.USDAI,
};

export const findTokenInfoByTokenEVMMainnet = (token: string) => {
  const tokenSymbol = findTokenNameEthereumMainnet[token];
  if (!tokenSymbol) {
    return null;
  }

  return mapNameToInfoEthereumMainnet[tokenSymbol];
};
