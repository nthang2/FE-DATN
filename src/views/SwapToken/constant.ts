import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TokenName } from 'src/libs/crypto-icons/types';

export const listTokenAvailableSwap = {
  [TokenName.USDC]: mapNameToInfoSolana[TokenName.USDC],
};
