import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getHealthFactor, getHealthFactorCrossMode } from 'src/services/HandleApi/getHealthFactor/getHealthFactor';
import { useCrossModeState } from 'src/states/hooks';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { useDebounce } from 'use-debounce';

interface IProps {
  depositItems: {
    address: string;
    value: string;
  }[];
  mintAmount: number;
}

const useHealthFactor = ({ depositItems, mintAmount }: IProps) => {
  const [crossMode] = useCrossModeState();
  const { address } = useSummarySolanaConnect();

  const totalDepositAmount = useMemo(() => {
    return depositItems.reduce((total, item) => Number(item.value) + total, 0);
  }, [depositItems]);

  const [totalDepositDebounce] = useDebounce(totalDepositAmount, 500);
  const [mintAmountDebounce] = useDebounce(mintAmount, 500);

  const query = useQuery({
    queryKey: ['useHealthFactor', crossMode, address, totalDepositDebounce, mintAmountDebounce],
    queryFn: () => {
      const tokens = depositItems.map((item) => ({
        token: item.address,
        amount: Number(item.value),
      }));

      try {
        if (crossMode) {
          return getHealthFactorCrossMode(address, { tokens, mintAmount: mintAmountDebounce });
        } else {
          return getHealthFactor(address, { token: depositItems[0].address, amount: totalDepositAmount, mintAmount });
        }
      } catch (error) {
        console.error(error);

        return {
          healthFactor: '0',
          estimateLiquidationPrice: '0',
          liquidationDetails: [],
        };
      }
    },
    enabled: !!address,
    staleTime: 1000 * 60 * 20, // 20 minutes
  });

  return query;
};

export default useHealthFactor;
