import { PublicKey } from '@solana/web3.js';
import { NETWORK } from 'src/constants';

export const REDEEMABLE_MINT_SEED = 'REDEEMABLE';
export const collateral = new PublicKey('3eURz91ZVhdVBghyet6wcDwsBTcsGxeMA2ovMkWku3Y8');
export const DEPOSITORY_SEED = 'DEPOSITORY';
export const CONTROLLER_SEED = 'CONTROLLER';
export const RESERVE_ACCOUNT =
  NETWORK === 'devnet'
    ? new PublicKey('8kmSBtXyQ5svS8qPiHLA5BTrQ2iUN86KATKn2EJUEpen')
    : new PublicKey('97MT8sKwFmPDWkJLnLr8aKysuKZdckngAWd4Lwz5WSr6');
