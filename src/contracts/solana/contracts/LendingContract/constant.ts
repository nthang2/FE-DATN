import { PublicKey } from '@solana/web3.js';
import { NETWORK } from 'src/constants';

export const collateral = new PublicKey('3eURz91ZVhdVBghyet6wcDwsBTcsGxeMA2ovMkWku3Y8');
export const CONTROLLER_SEED = 'CONTROLLER';
export const REDEEMABLE_MINT_SEED = 'REDEEMABLE';
export const DEPOSITORY_TYPE1_SEED = 'DEPOSITORY_TYPE_1';
export const LOAN_TYPE1_SEED = 'LOAN_TYPE_1';
export const DEPOSITORY_SEED = 'DEPOSITORY';
export const RESERVE_ACCOUNT =
  NETWORK === 'devnet'
    ? new PublicKey('DTcGkpdqXqr7fSwBE83EHtswegrJA4EZgbr8hhFyM4yw')
    : new PublicKey('97MT8sKwFmPDWkJLnLr8aKysuKZdckngAWd4Lwz5WSr6');
