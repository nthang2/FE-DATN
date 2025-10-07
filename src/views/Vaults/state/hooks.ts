import { useAtom } from 'jotai';
import { vaultSelectedNetwork } from './state';

export const useVaultSelectedNetwork = () => useAtom(vaultSelectedNetwork);
