import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { findTokenInfoByToken, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract/LendingContract';
// import useLendingContract from 'src/hooks/useContract/useLendingContract';
import { TokenName } from 'src/libs/crypto-icons/types';
import { BN } from 'src/utils';

const useSwapConfig = () => {
  const wallet = useWallet();
  //open when have swap in 2 mode
  // const { initLendingContract } = useLendingContract();

  const query = useQuery({
    queryKey: ['swap-config'],
    queryFn: async () => {
      if (!wallet) return null;
      const swapConfig = new LendingContract(wallet);
      const config = await swapConfig.getSwapConfig();

      return config;
    },
    staleTime: 1000 * 60 * 15,
  });

  const handleGetSwapInstruction = async (inputValue: string, selectedToken: string, isReverse: boolean) => {
    if (!wallet || !inputValue || !query.data)
      return {
        instruction: null,
        amount: Number(inputValue),
        addressLookupTable: [],
      };
    const selectedTokenInfo = findTokenInfoByToken(selectedToken);

    if (selectedTokenInfo?.symbol === TokenName.USDAI) {
      return {
        instruction: null,
        amount: Number(inputValue),
        addressLookupTable: [],
      };
    }

    const contract = new LendingContract(wallet);
    const stablecoinUsdc = query.data.stablecoins.find((stablecoin) => {
      return stablecoin.address.toString() === mapNameToInfoSolana[TokenName.USDC].address;
    });

    const stablecoin =
      query.data.stablecoins.find((stablecoin) => {
        return stablecoin.address.toString() === selectedTokenInfo?.address;
      }) || stablecoinUsdc;

    const { instruction, addressLookupTable, outAmount } = await contract.getSwapTokenInstruction(
      selectedToken,
      inputValue.toString(),
      isReverse
    );

    const amountBeforeSwap = outAmount ? outAmount : inputValue;

    const feeValue = BN(stablecoin?.fee0 / 100).multipliedBy(Number(amountBeforeSwap) / 100);
    const amount =
      BN(amountBeforeSwap)
        .minus(feeValue.toNumber() || 0)
        .toNumber() < 0
        ? 0
        : BN(amountBeforeSwap).minus(feeValue.toNumber() || 0);

    return { instruction, amount: amount, addressLookupTable };
  };

  return { ...query, handleGetSwapInstruction };
};

export default useSwapConfig;
