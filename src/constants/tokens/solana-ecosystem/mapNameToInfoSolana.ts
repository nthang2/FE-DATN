import { NETWORK } from 'src/constants';
import { findTokenNameSolanaMainnet, mapNameToInfoSolanaMainnet } from './solana-mainnet/mapNameToInfoSolanaMainnet';
import { findTokenNameSolanaDevnet, mapNameToInfoSolanaDevnet } from './solana-devnet/mapNameToInfoSolanaDevnet';
import { TokenName } from 'crypto-token-icon';

export const isDevNet = NETWORK === 'devnet';

export const mapNameToInfoSolana = isDevNet ? mapNameToInfoSolanaDevnet : mapNameToInfoSolanaMainnet;

export type TSolanaToken = keyof typeof mapNameToInfoSolana;

export const findTokenNameSolana: Record<string, TSolanaToken | undefined> = isDevNet
  ? findTokenNameSolanaDevnet
  : findTokenNameSolanaMainnet;

export const findTokenInfoByToken = (token: string) => {
  const tokenSymbol = findTokenNameSolana[token];
  if (!tokenSymbol) {
    return null;
  }

  return mapNameToInfoSolana[tokenSymbol];
};

export const listTokenAvailable = isDevNet
  ? {
      [TokenName.TRUMP]: mapNameToInfoSolana[TokenName.TRUMP],
      [TokenName.MAX]: mapNameToInfoSolana[TokenName.MAX],
      [TokenName.AI16Z]: mapNameToInfoSolana[TokenName.AI16Z],
    }
  : {
      [TokenName.ORAI]: mapNameToInfoSolana[TokenName.ORAI],
      [TokenName.MAX]: mapNameToInfoSolana[TokenName.MAX],
      [TokenName.USDC]: mapNameToInfoSolana[TokenName.USDC],
    };
