import { atom } from 'jotai';
import { SvgComponent } from 'src/libs/crypto-icons';

export const destinationNetworkAtom = atom<string>('');
export const sourceNetworkAtom = atom<string>('');
export const sourceWalletAtom = atom<string>('');
export const genMessageAtom = atom<string | undefined>(undefined);
export const destinationWalletAtom = atom<{
  address: string;
  wallet: string;
  iconWalletName?: string | SvgComponent | undefined;
  chainId: string;
}>({
  address: '',
  wallet: '',
  iconWalletName: undefined,
  chainId: '',
});
