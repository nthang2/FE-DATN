import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TokenName } from 'src/libs/crypto-icons/types';

export const listTokenAvailableVault = {
  [TokenName.USDC]: mapNameToInfoSolana[TokenName.USDC],
  [TokenName.USDAI]: mapNameToInfoSolana[TokenName.USDAI],
};
