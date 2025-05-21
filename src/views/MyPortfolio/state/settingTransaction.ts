import { atomWithStorage } from 'jotai/utils';

export const slippageToleranceAtom = atomWithStorage<number>('slippageTolerance', 0.1, undefined, {
  getOnInit: true,
});

export const priorityFeeAtom = atomWithStorage<number>('priorityFee', 1_000, undefined, {
  getOnInit: true,
});
