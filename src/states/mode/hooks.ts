import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { mode } from './state';

export const useMode = () => useAtom(mode);
export const useModeValue = () => useAtomValue(mode);

export const useModeFunction = () => useSetAtom(mode);
