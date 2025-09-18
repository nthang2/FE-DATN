import { atom } from 'jotai';
import { SvgComponent } from 'src/libs/crypto-icons';

export type SelectWallet = {
  address: string;
  wallet: string;
  iconWalletName?: string | SvgComponent | undefined;
  chainId: string;
};

export const defaultSelectWallet: SelectWallet = {
  address: '',
  wallet: '',
  iconWalletName: undefined,
  chainId: '',
};

export const destinationNetworkAtom = atom<string>('');
export const sourceNetworkAtom = atom<string>('');
export const sourceWalletAtom = atom<SelectWallet>(defaultSelectWallet);
export const destinationWalletAtom = atom<SelectWallet>(defaultSelectWallet);
export const genMessageAtom = atom<string | undefined>(undefined);
