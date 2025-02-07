import { NETWORK } from 'src/constants';
import { findTokenNameSolanaMainnet, mapNameToInfoSolanaMainnet } from './solana-mainnet/mapNameToInfoSolanaMainnet';
import { findTokenNameSolanaDevnet, mapNameToInfoSolanaDevnet } from './solana-devnet/mapNameToInfoSolanaDevnet';

export const mapNameToInfoSolana = NETWORK === 'devnet' ? mapNameToInfoSolanaDevnet : mapNameToInfoSolanaMainnet;

export type TSolanaToken = keyof typeof mapNameToInfoSolana;

export const findTokenNameSolana: Record<string, TSolanaToken | undefined> =
  NETWORK === 'devnet' ? findTokenNameSolanaDevnet : findTokenNameSolanaMainnet;

export const findTokenInfoByToken = (token: string) => {
  const tokenSymbol = findTokenNameSolana[token];
  if (!tokenSymbol) {
    return null;
  }

  return mapNameToInfoSolana[tokenSymbol];
};
