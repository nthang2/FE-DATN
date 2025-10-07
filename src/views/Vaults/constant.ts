import { mapNameToInfoEthereum } from 'src/constants/tokens/evm-ecosystem/mapNameToInfoEthereum';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TokenName } from 'src/libs/crypto-icons/types';

export const listTokenAvailableVault = {
  [TokenName.USDC]: mapNameToInfoSolana[TokenName.USDC],
  [TokenName.USDT]: mapNameToInfoSolana[TokenName.USDT],
  [TokenName.USDAI]: mapNameToInfoSolana[TokenName.USDAI],
};

export const listTokenAvailableVaultEVM = {
  [TokenName.USDAI]: mapNameToInfoEthereum[TokenName.USDAI],
};

export const listActionRebalanceScanLink: Record<string, string> = {
  '0x2105': 'https://basescan.org/tx',
  '0xa4b1': 'https://arbiscan.io/tx',
  solana: 'https://solscan.io/tx',
  '0x38': 'https://bscscan.com/tx',
};
