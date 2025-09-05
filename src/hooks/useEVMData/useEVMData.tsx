import { useAccount, useBalance, useChainId, useChains, useConnections, useConnectors } from 'wagmi';

export default function useEVMData() {
  const chains = useChains();
  const { address, connector, isConnected, isConnecting, chain } = useAccount();
  const connectors = useConnectors();
  const connections = useConnections();
  const chainId = useChainId();

  const { data: balance } = useBalance({
    address: address,
  });

  return {
    owner: isConnected ? address : null,
    chains,
    isConnected,
    isConnecting,
    connector,
    connectors,
    connections,
    chainId: chainId,
    balance,
    chain,
  };
}
