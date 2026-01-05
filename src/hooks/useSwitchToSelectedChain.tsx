import { useAccount, useChainId, useSwitchChain } from 'wagmi';

export default function useSwitchToSelectedChain() {
  const { chainId } = useAccount();
  const chainIdSelected = useChainId();
  const { switchChainAsync } = useSwitchChain();
  async function switchToChainSelected() {
    console.log({
      chainId,
      chainIdSelected,
    });

    if (chainId != chainIdSelected) {
      await switchChainAsync({ chainId: chainIdSelected });
    }
  }
  return {
    chainId,
    chainIdSelected,
    switchToChainSelected,
  };
}
