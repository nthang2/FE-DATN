// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { SolflareWalletAdapter, WalletConnectWalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import { useMemo } from 'react';
import { solNetworkSelect } from 'src/states/wallets/solana-blockchain/configs';

export default function ProviderSolana({ children }: { children: React.ReactNode }) {
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(solNetworkSelect), []);

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter({ network: solNetworkSelect }),
      new WalletConnectWalletAdapter({ network: solNetworkSelect, options: { projectId: '70f08000ad4aa5d23a4f67aa76e2de24' } }),
      new PhantomWalletAdapter({ network: solNetworkSelect }),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect localStorageKey="solana.connectWallet">
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
