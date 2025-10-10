import { atom } from 'jotai';
import { TMode } from './types';

const initData: TMode = {
  isUniversalMode: true,
};
export const mode = atom(initData);

export const modeFunction = atom(null, (get, set, action: { type: 'setMode'; data: Partial<TMode> }) => {
  const currentData = get(mode);
  switch (action.type) {
    case 'setMode':
      set(mode, { ...currentData, ...action.data });
      break;
    default:
      console.error('modeFunction: action.type not found');
      break;
  }
});
