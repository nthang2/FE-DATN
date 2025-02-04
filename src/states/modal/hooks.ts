import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { modal, modalFunction } from './state';

export const useModal = () => useAtom(modal);
export const useModalValue = () => useAtomValue(modal);

export const useModalFunction = () => useSetAtom(modalFunction);
