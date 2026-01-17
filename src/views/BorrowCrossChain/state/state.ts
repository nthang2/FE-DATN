import { atom } from 'jotai';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { defaultBorrowCrossValue } from '../constant';
import { TBorrowCrossItem } from './types';

export const depositCrossAtom = atom<TBorrowCrossItem[]>([defaultBorrowCrossValue]);
export const borrowCrossAtom = atom<TBorrowCrossItem>({ ...defaultBorrowCrossValue, address: mapNameToInfoSolana.HEHEHE.address });
export const selectedNetworkDepositAtom = atom<string>('solana');
export const selectedNetworkBorrowAtom = atom<string>('solana');
export const borrowCrossSubmitAtom = atom<boolean>(false);
