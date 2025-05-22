import { IconBSC, IconETH, SvgComponent } from 'src/libs/crypto-icons';
import { TAppChainId } from 'src/states/wallets/types';

export const chainIcon: Record<TAppChainId, SvgComponent> = {
  '1': IconETH,
  '56': IconBSC,
};
