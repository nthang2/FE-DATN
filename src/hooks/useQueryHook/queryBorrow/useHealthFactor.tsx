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
  otherKeys?: string[];
}

const useHealthFactor = ({ depositItems, mintAmount, otherKeys }: IProps) => {
  const [crossMode] = useCrossModeState();
  const { address } = useSummarySolanaConnect();

  const totalDepositAmount = useMemo(() => {
    return depositItems.reduce((total, item) => Number(item.value) + total, 0);
  }, [depositItems]);
  const tokens = useMemo(() => {
    return depositItems.map((item) => ({
      token: item.address,
      amount: Number(item.value),
    }));
  }, [depositItems]);

  const [totalDepositDebounce] = useDebounce(totalDepositAmount, 500);
  const [mintAmountDebounce] = useDebounce(mintAmount, 500);

  const queryKey = useMemo(() => {
    if (crossMode) {
      return ['useHealthFactor', crossMode, address, totalDepositDebounce, mintAmountDebounce, ...(otherKeys || [])];
    }
    return ['useHealthFactor', address, totalDepositDebounce, mintAmountDebounce, tokens, ...(otherKeys || [])];
  }, [crossMode, address, totalDepositDebounce, mintAmountDebounce, tokens, otherKeys]);

  const query = useQuery({
    queryKey: queryKey,
    queryFn: () => {
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
