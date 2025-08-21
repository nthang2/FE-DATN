import { useWallet } from '@solana/wallet-adapter-react';
import { Transaction } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useLendingContract from 'src/hooks/useContract/useLendingContract';
import { TokenName } from 'src/libs/crypto-icons/types';
import { BN } from 'src/utils';

const useSwapConfig = () => {
  const wallet = useWallet();
  const { initLendingContract } = useLendingContract();

  const query = useQuery({
    queryKey: ['swap-config'],
    queryFn: async () => {
      if (!wallet) return null;
      const swapConfig = initLendingContract(wallet);
      const config = await swapConfig.getSwapConfig();

      return config;
    },
    staleTime: 1000 * 60 * 15,
  });

  const handleGetSwapInstruction = async (inputValue: string, selectedToken: string, isReverse: boolean) => {
    if (!wallet || !inputValue || !query.data) return { instruction: new Transaction(), amount: Number(inputValue) };
    const selectedTokenInfo = findTokenInfoByToken(selectedToken);

    if (selectedTokenInfo?.symbol === TokenName.USDAI) {
      return { instruction: new Transaction(), amount: Number(inputValue) };
    }

    const contract = initLendingContract(wallet);
    const stablecoin = query.data.stablecoins.find((stablecoin) => {
      return stablecoin.address.toString() === selectedTokenInfo?.address;
    });

    const feeValue = BN(stablecoin?.fee0 / 100).multipliedBy(Number(inputValue) / 100);
    const amount = BN(inputValue).minus(feeValue).toNumber() < 0 ? 0 : BN(inputValue).minus(feeValue);
    const instruction = await contract.getSwapTokenInstruction(selectedToken, inputValue.toString(), isReverse);

    return { instruction, amount };
  };

  return { ...query, handleGetSwapInstruction };
};

export default useSwapConfig;
