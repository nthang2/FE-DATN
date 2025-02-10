import { useAtom } from 'jotai';
import { borrowAtom, borrowSubmitAtom, depositAtom } from './state';

export const useBorrowState = () => useAtom(borrowAtom);
export const useDepositState = () => useAtom(depositAtom);
export const useBorrowSubmitState = () => useAtom(borrowSubmitAtom);
