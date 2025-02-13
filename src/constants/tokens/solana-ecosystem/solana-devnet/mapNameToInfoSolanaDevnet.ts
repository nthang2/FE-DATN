import { TokenName } from 'crypto-token-icon';
import { token1SolanaDevnet, token2SolanaDevnet, token3SolanaDevnet, solanaDevnet, usdaiSolanaDevnet } from '.';

export const mapNameToInfoSolanaDevnet = {
  [TokenName.TRUMP]: token1SolanaDevnet,
  [TokenName.MAX]: token2SolanaDevnet,
  [TokenName.AI16Z]: token3SolanaDevnet,
  [TokenName.SOL]: solanaDevnet,
  [TokenName.USDAI]: usdaiSolanaDevnet,
};

export type TSolanaDevnetToken = keyof typeof mapNameToInfoSolanaDevnet;

export const findTokenNameSolanaDevnet: Record<string, TSolanaDevnetToken | undefined> = {
  [token1SolanaDevnet.address]: TokenName.MAX,
  [token2SolanaDevnet.address]: TokenName.TRUMP,
  [token3SolanaDevnet.address]: TokenName.AI16Z,
  [usdaiSolanaDevnet.address]: TokenName.USDAI,
};
