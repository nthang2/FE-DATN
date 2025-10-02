import { useAtom } from 'jotai';
import { borrowCrossAtom, borrowCrossSubmitAtom, depositCrossAtom, selectedNetworkAtom } from './state';

export const useBorrowCrossState = () => useAtom(borrowCrossAtom);
export const useDepositCrossState = () => useAtom(depositCrossAtom);
export const useBorrowCrossSubmitState = () => useAtom(borrowCrossSubmitAtom);
export const useSelectedNetworkState = () => useAtom(selectedNetworkAtom);
