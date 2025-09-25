import { IconBSC, IconETH, IconSOL, SvgComponent } from 'src/libs/crypto-icons';
import { TAppChainId } from 'src/states/wallets/types';

export const chainIcon: Record<TAppChainId, SvgComponent> = {
  '1': IconETH,
  '56': IconBSC,
};

export const chainNetwork: Record<string, string> = {
  solana: '2',
  ethereum: '1',
};

export const chainIconNetwork: Record<string, SvgComponent> = {
  2: IconSOL,
  1: IconETH,
};
