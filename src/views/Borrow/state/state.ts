import { atom } from 'jotai';
import { defaultBorrowValue } from '../constant';
import { TBorrowItem } from './types';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';

export const depositAtom = atom<TBorrowItem[]>([defaultBorrowValue]);
export const borrowAtom = atom<TBorrowItem>({ ...defaultBorrowValue, address: mapNameToInfoSolana.UniUSD.address });
export const borrowSubmitAtom = atom<boolean>(false);
