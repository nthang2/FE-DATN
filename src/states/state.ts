import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { defaultRpc } from 'src/constants';

export const crossModeAtom = atom<boolean>(true);
export const selectRpc = atomWithStorage<string>('rpc', defaultRpc, undefined, { getOnInit: true });
selectRpc.debugLabel = 'CustomRpcState';
