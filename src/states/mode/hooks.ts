import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { mode } from './state';

export const useUniversalMode = () => useAtom(mode);
export const useUniversalModeValue = () => useAtomValue(mode);

export const useUniversalModeFunction = () => useSetAtom(mode);
