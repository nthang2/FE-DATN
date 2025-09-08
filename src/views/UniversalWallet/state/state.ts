import { atom } from 'jotai';

export const destinationNetworkAtom = atom<string>('');
export const destinationWalletAtom = atom<{ address: string; wallet: string }>({
  address: '',
  wallet: '',
});
