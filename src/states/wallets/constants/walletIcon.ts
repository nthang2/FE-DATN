import { SvgComponent } from 'src/libs/crypto-icons';
import { IconLeap, IconMetaMask, IconOwallet, IconTronLink, IconWalletConnect } from 'src/libs/crypto-icons/wallets';

// TODO: liệt kê toàn bộ các id của wallet và icon tương ứng
export const walletIcon: { [k: string]: SvgComponent } = {
  'owallet-extension': IconOwallet,
  'app.owallet': IconOwallet,
  OWallet: IconOwallet,
  'io.leapwallet.LeapWallet': IconLeap,
  'leap-extension': IconLeap,
  'cosmos-extension-metamask': IconMetaMask,
  metaMaskSDK: IconMetaMask,
  MetaMask: IconMetaMask,
  walletConnect: IconWalletConnect,
  WalletConnect: IconWalletConnect,
  TronLink: IconTronLink,
};
