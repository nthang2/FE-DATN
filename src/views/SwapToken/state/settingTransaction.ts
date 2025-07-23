import { atomWithStorage } from 'jotai/utils';

export const slippageSwapAtom = atomWithStorage<number>('slippageSwap', 0.1, undefined, {
  getOnInit: true,
});

export const priorityFeeSwapAtom = atomWithStorage<number>('priorityFeeSwap', 1_000, undefined, {
  getOnInit: true,
});
