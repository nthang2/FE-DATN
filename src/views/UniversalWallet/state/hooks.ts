import { useAtom } from 'jotai';
import { destinationNetworkAtom, destinationWalletAtom, genMessageAtom, sourceNetworkAtom, sourceWalletAtom } from './state';

export const useDestinationWalletState = () => useAtom(destinationWalletAtom);
export const useDestinationNetworkState = () => useAtom(destinationNetworkAtom);
export const useSourceNetworkState = () => useAtom(sourceNetworkAtom);
export const useSourceWalletState = () => useAtom(sourceWalletAtom);
export const useGenMessageState = () => useAtom(genMessageAtom);
