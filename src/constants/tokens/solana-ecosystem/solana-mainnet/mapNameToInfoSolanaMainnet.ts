import { TokenName } from 'crypto-token-icon';
import { ai16zTokenSolana, maxTokenSolana, solTokenSolana, trumpTokenSolana, wsolTokenSolana } from '.';

export const mapNameToInfoSolanaMainnet = {
  [TokenName.SOL]: solTokenSolana,
  [TokenName.WSOL]: wsolTokenSolana,
  [TokenName.TRUMP]: trumpTokenSolana,
  [TokenName.MAX]: maxTokenSolana,
  [TokenName.AI16Z]: ai16zTokenSolana,
};

export type TSolanaMainnetToken = keyof typeof mapNameToInfoSolanaMainnet;

export const findTokenNameSolana: Record<string, TSolanaMainnetToken | undefined> = {
  [solTokenSolana.address]: TokenName.SOL,
  [wsolTokenSolana.address]: TokenName.WSOL,
  [trumpTokenSolana.address]: TokenName.TRUMP,
  [maxTokenSolana.address]: TokenName.MAX,
  [ai16zTokenSolana.address]: TokenName.AI16Z,
};

export const findTokenInfoByToken = (token: string) => {
  const tokenSymbol = findTokenNameSolana[token];
  if (!tokenSymbol) {
    return null;
  }

  return mapNameToInfoSolanaMainnet[tokenSymbol];
};
