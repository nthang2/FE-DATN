import { getDefaultStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { defaultRpc } from 'src/constants';

export const crossModeAtom = atomWithStorage<boolean>('cross_mode', true, undefined, { getOnInit: true });
export const selectRpc = atomWithStorage<string>('rpc', defaultRpc, undefined, { getOnInit: true });
selectRpc.debugLabel = 'CustomRpcState';

export const appStore = getDefaultStore();
