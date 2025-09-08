import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from 'src/states/wallets/evm-blockchain/config';
import { WagmiProvider } from 'wagmi';
const queryClient = new QueryClient();

export default function ProviderEVM({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
