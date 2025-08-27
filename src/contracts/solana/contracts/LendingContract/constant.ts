import { PublicKey } from '@solana/web3.js';
import { NETWORK } from 'src/constants';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TokenName } from 'src/libs/crypto-icons';

export const collateral = new PublicKey('3eURz91ZVhdVBghyet6wcDwsBTcsGxeMA2ovMkWku3Y8');
export const CONTROLLER_SEED = 'CONTROLLER';
export const REDEEMABLE_MINT_SEED = 'REDEEMABLE';
export const DEPOSITORY_TYPE1_SEED = 'DEPOSITORY_TYPE_1';
export const LOAN_TYPE1_SEED = 'LOAN_TYPE_1';
export const DEPOSITORY_SEED = 'DEPOSITORY';
export const RESERVE_ACCOUNT =
  NETWORK === 'devnet'
    ? new PublicKey('6cnRUXyctJcC6GbxJDu3n3k68cXH1jizLeMhGdmwgkhu')
    : new PublicKey('HcYBeyAkXaDCvgULg22ijEuTHL1wj1zMKFNZgSKpDeU9');
export const REDEEM_CONFIG = 'REDEEM_COL_CONFIG_V2';
export const LOAN_TYPE0_SEED = 'LOAN';
export const computeUnits = 1_400_000;
export const defaultSlippageBps = 50;
export const jupiterProgram = new PublicKey('JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4');

//env for swap
export const SWAP_CONFIG_SEED = 'SWAP_USDAI';
export const listTokenSwapWithJup = [mapNameToInfoSolana[TokenName.USDT].address];
export const token = [mapNameToInfoSolana[TokenName.USDT].address];
export const swapUsdcALT = 'DLTRdmsaLSwQPRsAEAxiUErmQRRBbNSDfDfM1DnCNp7a';
