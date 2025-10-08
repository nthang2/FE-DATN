import { IconSOL } from 'src/libs/crypto-icons/tokens/IconSOL';
import { IconETH } from 'src/libs/crypto-icons/tokens/IconETH';

export type TNetwork = {
  name: string;
  id: string;
  icon: React.ReactNode;
  chainId: number;
};

export const mapNameNetwork: Record<string, TNetwork> = {
  solana: {
    id: 'solana',
    name: 'Solana',
    icon: <IconSOL />,
    chainId: 2,
  },
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    icon: <IconETH />,
    chainId: 1,
  },
} as const;

export const listScanLink: Record<string, string> = {
  solana: 'https://solscan.io/tx',
  ethereum: 'https://etherscan.io/tx',
};
