import { useAtom } from 'jotai';
import { crossModeAtom } from './state';

export const useCrossModeState = () => useAtom(crossModeAtom);
