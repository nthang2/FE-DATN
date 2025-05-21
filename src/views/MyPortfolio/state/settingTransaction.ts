import { atomWithStorage } from 'jotai/utils';

export const slippageToleranceAtom = atomWithStorage<number>('slippageTolerance', 0.1, undefined, {
  getOnInit: true,
});

export const priorityFeeAtom = atomWithStorage<string>('priorityFee', 'normal', undefined, {
  getOnInit: true,
});
