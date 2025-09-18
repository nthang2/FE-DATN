import { configUniversalWallet } from 'src/states/wallets/evm-blockchain/config';
import { WagmiProvider } from 'wagmi';

export default function ProviderEVMUniversalWallet({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={configUniversalWallet}>{children}</WagmiProvider>;
}
