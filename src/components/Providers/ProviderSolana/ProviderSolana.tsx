// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import { UnsafeBurnerWalletAdapter, SolflareWalletAdapter, LedgerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

import { useMemo } from 'react';
import { solNetworkSelect } from 'src/states/wallets/solana-blockchain/configs';

export default function ProviderSolana({ children }: { children: React.ReactNode }) {
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(solNetworkSelect), [solNetworkSelect]);

  const wallets = useMemo(
    () => [new SolflareWalletAdapter({ network: solNetworkSelect }), new UnsafeBurnerWalletAdapter(), new LedgerWalletAdapter()],
    [solNetworkSelect]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect localStorageKey="solana.connectWallet">
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
