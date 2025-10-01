import { NETWORK } from 'src/constants';
import { TokenName } from 'src/libs/crypto-icons';
import { findTokenNameSolanaDevnet, mapNameToInfoSolanaDevnet } from './solana-devnet/mapNameToInfoSolanaDevnet';
import { findTokenNameSolanaMainnet, mapNameToInfoSolanaMainnet } from './solana-mainnet/mapNameToInfoSolanaMainnet';

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
      [TokenName.SOL]: mapNameToInfoSolana[TokenName.SOL],
      [TokenName.USDC]: mapNameToInfoSolana[TokenName.USDC],
      [TokenName.USDAI]: mapNameToInfoSolana[TokenName.USDAI],
    }
  : {
      [TokenName.ORAI]: mapNameToInfoSolana[TokenName.ORAI],
      [TokenName.MAX]: mapNameToInfoSolana[TokenName.MAX],
      [TokenName.USDC]: mapNameToInfoSolana[TokenName.USDC],
      [TokenName.SOL]: mapNameToInfoSolana[TokenName.SOL],
      [TokenName.VIRTUAL]: mapNameToInfoSolana[TokenName.VIRTUAL],
      [TokenName.scORAI]: mapNameToInfoSolana[TokenName.scORAI],
      [TokenName.USDAI]: mapNameToInfoSolana[TokenName.USDAI],
    };
