import { SvgComponent } from 'crypto-token-icon';
import { IconETH } from 'crypto-token-icon/tokens';
import { IconBSC } from 'crypto-token-icon/systems';
import { TAppChainId } from 'src/states/wallets/types';

export const chainIcon: Record<TAppChainId, SvgComponent> = {
  '1': IconETH,
  '56': IconBSC,
};
