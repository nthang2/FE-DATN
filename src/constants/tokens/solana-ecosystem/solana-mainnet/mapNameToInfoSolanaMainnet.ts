import { TokenName } from 'crypto-token-icon';
import {
  ai16zTokenSolana,
  maxTokenSolana,
  trumpTokenSolana,
  solTokenSolana,
  usdaiSolanaMainnet,
  usdcSolanaMainnet,
  oraiSolanaMainnet,
} from '.';

export const mapNameToInfoSolanaMainnet = {
  [TokenName.TRUMP]: trumpTokenSolana,
  [TokenName.MAX]: maxTokenSolana,
  [TokenName.AI16Z]: ai16zTokenSolana,
  [TokenName.SOL]: solTokenSolana,
  [TokenName.USDAI]: usdaiSolanaMainnet,
  [TokenName.USDC]: usdcSolanaMainnet,
  [TokenName.ORAI]: oraiSolanaMainnet,
};

export type TSolanaMainnetToken = keyof typeof mapNameToInfoSolanaMainnet;

export const findTokenNameSolanaMainnet: Record<string, TSolanaMainnetToken | undefined> = {
  [trumpTokenSolana.address]: TokenName.TRUMP,
  [maxTokenSolana.address]: TokenName.MAX,
  [ai16zTokenSolana.address]: TokenName.AI16Z,
  [usdaiSolanaMainnet.address]: TokenName.USDAI,
  [oraiSolanaMainnet.address]: TokenName.ORAI,
  [usdcSolanaMainnet.address]: TokenName.USDC,
  [solTokenSolana.address]: TokenName.SOL,
};
