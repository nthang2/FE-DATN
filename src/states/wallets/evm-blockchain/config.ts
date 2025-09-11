import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { metaMaskConnector } from './connectors/metamaskConnector';
import { walletConnectConnector } from './connectors/walletConnectConnector';

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMaskConnector, walletConnectConnector],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export const configUniversalWallet = createConfig({
  chains: [mainnet],
  connectors: [metaMaskConnector, walletConnectConnector],
  transports: {
    [mainnet.id]: http(),
  },
});
