import { SvgIconProps } from '@mui/material/SvgIcon';

export type SvgComponent = React.FC<SvgIconProps>;

export type IconUrls = {
  lightmode: string;
  darkmode: string;
}

export { TokenName } from './TokenName';
export { WalletName } from './WalletName';
export { SystemName } from './SystemName';
