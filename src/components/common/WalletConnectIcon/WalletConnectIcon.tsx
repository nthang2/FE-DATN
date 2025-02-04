import { SvgComponent } from 'crypto-token-icon';

interface IProps {
  Icon: string | SvgComponent | undefined;
  size?: string;
}

const WalletConnectIcon = ({ Icon, size = '30' }: IProps) => {
  if (!Icon) {
    return <></>;
  }

  if (typeof Icon === 'string') {
    return <img src={Icon} alt="wallet_icon" width={size} height={size} />;
  }

  return <Icon sx={{ fontSize: `${size}px` }} />;
};

export default WalletConnectIcon;
