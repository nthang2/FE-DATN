import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { metaMaskConnector } from './connectors/metamaskConnector';
import { walletConnectConnector } from './connectors/walletConnectConnector';

export const config = createConfig({
  chains: [mainnet],
  connectors: [metaMaskConnector, walletConnectConnector],
  transports: {
    [mainnet.id]: http(),
  },
});
