import { IconLeap, IconLedger, IconMetamask, IconOwallet, IconTronLink, IconWalletConnect, SvgComponent } from 'crypto-token-icon';

// TODO: liệt kê toàn bộ các id của wallet và icon tương ứng
export const walletIcon: { [k: string]: SvgComponent } = {
    'owallet-extension': IconOwallet,
    'app.owallet': IconOwallet,
    OWallet: IconOwallet,
    'io.leapwallet.LeapWallet': IconLeap,
    'leap-extension': IconLeap,
    'cosmos-extension-metamask': IconMetamask,
    metaMaskSDK: IconMetamask,
    MetaMask: IconMetamask,
    Ledger: IconLedger,
    walletConnect: IconWalletConnect,
    WalletConnect: IconWalletConnect,
    TronLink: IconTronLink,
};
