import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getUniversalHealthFactor } from 'src/services/HandleApi/getMyPortfolioUniversal/getUniversalHealthFactor';
import { useCrossModeState } from 'src/states/hooks';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';
import { useDebounce } from 'use-debounce';

interface IProps {
  depositItems: {
    address: string;
    value: string;
  }[];
  mintAmount: number;
  otherKeys?: string[];
}

const useHealthFactorUniversal = ({ depositItems, mintAmount, otherKeys }: IProps) => {
  const [crossMode] = useCrossModeState();
  const { address, chainId } = useSummaryFirstActiveConnect();

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
      return ['useHealthFactorUniversal', crossMode, address, totalDepositDebounce, mintAmountDebounce, ...(otherKeys || [])];
    }
    return ['useHealthFactorUniversal', address, totalDepositDebounce, mintAmountDebounce, tokens, ...(otherKeys || [])];
  }, [crossMode, address, totalDepositDebounce, mintAmountDebounce, tokens, otherKeys]);

  const query = useQuery({
    queryKey: queryKey,
    queryFn: () => {
      try {
        return getUniversalHealthFactor({ tokens, mintAmount: mintAmountDebounce, chainId: Number(chainId), walletAddress: address });
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

export default useHealthFactorUniversal;
