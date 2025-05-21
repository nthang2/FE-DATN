import { useAtom } from 'jotai';
import { priorityFeeAtom, slippageToleranceAtom } from './settingTransaction';

export const useSlippageToleranceState = () => useAtom(slippageToleranceAtom);
export const usePriorityFeeState = () => useAtom(priorityFeeAtom);
