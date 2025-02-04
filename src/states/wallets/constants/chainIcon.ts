import { IconBSC, IconETH, SvgComponent } from 'crypto-token-icon';
import { TAppChainId } from 'src/states/wallets/types';

export const chainIcon: Record<TAppChainId, SvgComponent> = {
  '1': IconETH,
  '56': IconBSC,
};
