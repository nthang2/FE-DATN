import { TokenName } from 'crypto-token-icon';
import { ai16zTokenSolana, maxTokenSolana, trumpTokenSolana, solTokenSolana } from '.';

export const mapNameToInfoSolanaMainnet = {
  [TokenName.TRUMP]: trumpTokenSolana,
  [TokenName.MAX]: maxTokenSolana,
  [TokenName.AI16Z]: ai16zTokenSolana,
  [TokenName.SOL]: solTokenSolana,
};

export type TSolanaMainnetToken = keyof typeof mapNameToInfoSolanaMainnet;

export const findTokenNameSolanaMainnet: Record<string, TSolanaMainnetToken | undefined> = {
  [trumpTokenSolana.address]: TokenName.TRUMP,
  [maxTokenSolana.address]: TokenName.MAX,
  [ai16zTokenSolana.address]: TokenName.AI16Z,
};
