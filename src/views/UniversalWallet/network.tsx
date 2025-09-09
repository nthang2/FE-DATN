import { IconSOL } from 'src/libs/crypto-icons/tokens/IconSOL';
import { IconETH } from 'src/libs/crypto-icons/tokens/IconETH';
import { IconMetaMask } from 'src/libs/crypto-icons/wallets/IconMetaMask';
import { IconWalletConnect } from 'src/libs/crypto-icons/wallets/IconWalletConnect';

export type TNetwork = {
  name: string;
  id: string;
  icon: React.ReactNode;
};

export const mapNameNetwork: Record<string, TNetwork> = {
  solana: {
    id: 'solana',
    name: 'Solana',
    icon: <IconSOL />,
  },
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    icon: <IconETH />,
  },
};

export const mapNameWalletIcon: Record<string, React.ReactNode> = {
  MetaMask: <IconMetaMask />,
  WalletConnect: <IconWalletConnect />,
};
