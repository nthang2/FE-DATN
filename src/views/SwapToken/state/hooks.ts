import { useAtom } from 'jotai';
import { priorityFeeSwapAtom, slippageSwapAtom } from './settingTransaction';

export const useSlippageSwapState = () => useAtom(slippageSwapAtom);
export const usePriorityFeeSwapState = () => useAtom(priorityFeeSwapAtom);
