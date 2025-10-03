import { useAtom } from 'jotai';
import { borrowCrossAtom, borrowCrossSubmitAtom, depositCrossAtom, selectedNetworkDepositAtom, selectedNetworkBorrowAtom } from './state';

export const useBorrowCrossState = () => useAtom(borrowCrossAtom);
export const useDepositCrossState = () => useAtom(depositCrossAtom);
export const useBorrowCrossSubmitState = () => useAtom(borrowCrossSubmitAtom);
export const useSelectedNetworkDepositState = () => useAtom(selectedNetworkDepositAtom);
export const useSelectedNetworkBorrowState = () => useAtom(selectedNetworkBorrowAtom);
