import { atom } from 'jotai';
import { defaultBorrowValue } from '../constant';
import { TBorrowItem } from './types';

export const depositAtom = atom<TBorrowItem[]>([defaultBorrowValue]);
export const borrowAtom = atom<TBorrowItem>(defaultBorrowValue);
