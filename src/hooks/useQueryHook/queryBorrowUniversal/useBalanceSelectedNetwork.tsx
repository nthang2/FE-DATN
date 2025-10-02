import { TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useGetBalanceEVM from 'src/states/wallets/evm-blockchain/hooks/useGetBalanceEVM';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { useSelectedNetworkState } from 'src/views/BorrowCrossChain/state/hooks';

const useBalanceSelectedNetwork = (tokenAddress: string) => {
  const [selectedNetwork] = useSelectedNetworkState();
  const { address: addressSolana } = useSummarySolanaConnect();

  const balanceEVM = useGetBalanceEVM(tokenAddress);
  const balanceSolana = useSolanaBalanceToken(addressSolana, tokenAddress as TSolanaToken);

  return selectedNetwork === 'solana' ? balanceSolana : balanceEVM;
};

export default useBalanceSelectedNetwork;
