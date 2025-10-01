import { TokenName } from 'src/libs/crypto-icons';
import { bnbEthereumTestnet, ethEthereumTestnet, usdaiEthereumTestnet, usdcEthereumTestnet, usdtEthereumTestnet } from '.';
import { EthereumChainTokenInfo } from '../ethereum/EthereumChainTokenInfo';

export const mapNameToInfoEthereumDevnet: Record<string, EthereumChainTokenInfo | undefined> = {
  [TokenName.BNB]: bnbEthereumTestnet,
  [TokenName.USDC]: usdcEthereumTestnet,
  [TokenName.USDT]: usdtEthereumTestnet,
  [TokenName.ETH]: ethEthereumTestnet,
  [TokenName.USDAI]: usdaiEthereumTestnet,
};

export type TEthereumToken = keyof typeof mapNameToInfoEthereumDevnet;

export const findTokenNameEthereumDevnet: Record<string, TEthereumToken> = {
  [bnbEthereumTestnet.address]: TokenName.BNB,
  [usdcEthereumTestnet.address]: TokenName.USDC,
  [usdtEthereumTestnet.address]: TokenName.USDT,
  [ethEthereumTestnet.address]: TokenName.ETH,
  [usdaiEthereumTestnet.address]: TokenName.USDAI,
};

export const findTokenInfoByTokenEVMDevnet = (token: string) => {
  const tokenSymbol = findTokenNameEthereumDevnet[token];
  if (!tokenSymbol) {
    return null;
  }

  return mapNameToInfoEthereumDevnet[tokenSymbol];
};
