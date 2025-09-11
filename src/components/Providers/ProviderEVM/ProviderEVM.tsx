import { config } from 'src/states/wallets/evm-blockchain/config';
import { WagmiProvider } from 'wagmi';

export default function ProviderEVM({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
