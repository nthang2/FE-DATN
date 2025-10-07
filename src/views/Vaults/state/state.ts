import { atom } from 'jotai';
import { mapNameNetwork } from 'src/constants/network';

export const vaultSelectedNetwork = atom<string>(mapNameNetwork.solana.id);
