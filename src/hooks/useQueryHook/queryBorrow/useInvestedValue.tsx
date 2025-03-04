import { useMemo } from 'react';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { useDepositState } from 'src/views/Borrow/state/hooks';
import { convertToUsd } from 'src/views/Borrow/utils';
import useQueryDepositValue from '../queryMyPortfolio/useQueryDepositValue';
import useMyPortfolio from '../queryMyPortfolio/useMyPortfolio';

const useInvestedValue = () => {
  const { data: listPrice } = useQueryAllTokensPrice();
  const { asset } = useMyPortfolio();
  const [depositItems] = useDepositState();
  const { data: depositedValue } = useQueryDepositValue();

  //Already minted by deposit address
  const yourBorrowByAddress = useMemo(() => {
    const mintedByAddress = asset ? asset[depositItems[0].address].usdaiToRedeem : 0;

    return mintedByAddress ? Number(mintedByAddress) : 0;
  }, [asset, depositItems]);

  //Already deposit by deposit address
  const depositedByAddress = useMemo(() => {
    if (!depositedValue || !listPrice) return 0;
    const depositAddress = depositItems[0].address;
    const deposited = convertToUsd(depositAddress, depositedValue[depositAddress], listPrice) || 0;

    return deposited;
  }, [depositItems, depositedValue, listPrice]);

  //Total deposit include already deposit amount and input amount
  const totalDepositValue = useMemo(() => {
    return depositItems[0].price + depositedByAddress;
  }, [depositItems, depositedByAddress]);

  const maxLtv = useMemo(() => {
    if (depositItems[0]) {
      const tokenInfo = findTokenInfoByToken(depositItems[0].address);
      return Number(tokenInfo?.ratio) * 100;
    }

    return 30;
  }, [depositItems]);

  const maxBorrowPrice = useMemo(() => {
    const borrowPrice = (Number(maxLtv) / 100) * totalDepositValue - yourBorrowByAddress;
    return borrowPrice;
  }, [maxLtv, totalDepositValue, yourBorrowByAddress]);

  return {
    yourBorrowByAddress,
    depositedByAddress,
    totalDepositValue,
    maxLtv,
    maxBorrowPrice,
  };
};

export default useInvestedValue;
