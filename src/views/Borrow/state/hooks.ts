import { useAtom } from 'jotai';
import { borrowAtom, depositAtom } from './state';

export const useBorrowState = () => useAtom(borrowAtom);
export const useDepositState = () => useAtom(depositAtom);
