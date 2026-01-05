import { createConfig, http } from 'wagmi';
// import { mainnet, sepolia } from 'wagmi/chains';
import { metaMaskConnector } from './connectors/metamaskConnector';
import { walletConnectConnector } from './connectors/walletConnectConnector';
import { sepolia } from './chain/sepolia';

export const config = createConfig({
  chains: [sepolia],
  connectors: [metaMaskConnector, walletConnectConnector],
  transports: {
    [sepolia.id]: http(),
  },
});

export const configUniversalWallet = createConfig({
  chains: [sepolia],
  connectors: [metaMaskConnector, walletConnectConnector],
  transports: {
    [sepolia.id]: http(),
  },
});
