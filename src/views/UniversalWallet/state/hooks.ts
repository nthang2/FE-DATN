import { useAtom } from 'jotai';
import { destinationNetworkAtom, destinationWalletAtom } from './state';

export const useDestinationWalletState = () => useAtom(destinationWalletAtom);
export const useDestinationNetworkState = () => useAtom(destinationNetworkAtom);
