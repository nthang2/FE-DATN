import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const crossModeAtom = atom<boolean>(true);
export const selectRpc = atomWithStorage<string>(
  'rpc',
  'https://solana-mainnet.core.chainstack.com/13dd9ef445fe8c91fde9f443a15704c9',
  undefined,
  { getOnInit: true }
);
selectRpc.debugLabel = 'CustomRpcState';
