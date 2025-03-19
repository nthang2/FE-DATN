import { Connection } from '@solana/web3.js';
import { getDefaultStore, useAtom } from 'jotai';
import { crossModeAtom, selectRpc } from './state';

export const useCrossModeState = () => useAtom(crossModeAtom);
export const useGlobalRpcState = () => useAtom(selectRpc);

export const publicClientSol = () => {
  const store = getDefaultStore();
  return new Connection(store.get(selectRpc), 'confirmed');
};
