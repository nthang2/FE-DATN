import { atom } from 'jotai';
import { TModalData, TModalFunctionName } from './types';

const initData: TModalData = {
  open: false,
  title: '',
  modalProps: undefined,
  conditionOpen: true,
  content: <></>,
  isShowCloseModal: true,
};

export const modal = atom(initData);

export const modalFunction = atom(null, (get, set, action: { type: TModalFunctionName; data?: Partial<TModalData> }) => {
  const currentData = get(modal);
  switch (action.type) {
    case 'setModalData':
      set(modal, { ...currentData, ...action.data });
      break;
    case 'openModal':
      set(modal, { ...currentData, ...action.data, open: true });
      break;
    case 'closeModal':
      set(modal, {
        ...currentData,
        title: '',
        conditionOpen: true,
        open: false,
      });
      break;
    default:
      console.error('modalFunction: action.type not found');
      break;
  }
});
