import { TokenName } from 'src/libs/crypto-icons';
import {
  token1SolanaDevnet,
  token2SolanaDevnet,
  token3SolanaDevnet,
  solanaDevnet,
  usdaiSolanaDevnet,
  usdcDevSolanaDevnet,
  oraiSolanaDevnet,
  virtualSolanaDevnet,
} from '.';

export const mapNameToInfoSolanaDevnet = {
  [TokenName.MAX]: token1SolanaDevnet,
  [TokenName.TRUMP]: token2SolanaDevnet,
  [TokenName.AI16Z]: token3SolanaDevnet,
  [TokenName.SOL]: solanaDevnet,
  [TokenName.USDAI]: usdaiSolanaDevnet,
  [TokenName.USDC]: usdcDevSolanaDevnet,
  [TokenName.ORAI]: oraiSolanaDevnet,
  [TokenName.VIRTUAL]: virtualSolanaDevnet,
  [TokenName.scORAI]: oraiSolanaDevnet,
};

export type TSolanaDevnetToken = keyof typeof mapNameToInfoSolanaDevnet;

export const findTokenNameSolanaDevnet: Record<string, TSolanaDevnetToken | undefined> = {
  [token1SolanaDevnet.address]: TokenName.MAX,
  [token2SolanaDevnet.address]: TokenName.TRUMP,
  [token3SolanaDevnet.address]: TokenName.AI16Z,
  [usdaiSolanaDevnet.address]: TokenName.USDAI,
  [solanaDevnet.address]: TokenName.SOL,
  [virtualSolanaDevnet.address]: TokenName.VIRTUAL,
};
