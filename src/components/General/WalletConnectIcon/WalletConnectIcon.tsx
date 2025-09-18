import { SvgComponent } from 'src/libs/crypto-icons/types';

interface IProps {
  Icon: string | SvgComponent | undefined;
  size?: string;
  style?: React.CSSProperties;
}

const WalletConnectIcon = ({ Icon, size = '30', style }: IProps) => {
  if (!Icon) {
    return <></>;
  }

  if (typeof Icon === 'string') {
    return <img src={Icon} alt="wallet_icon" width={size} height={size} style={style} />;
  }

  return <Icon sx={{ fontSize: `${size}px`, borderRadius: '10px', ...style }} />;
};

export default WalletConnectIcon;
