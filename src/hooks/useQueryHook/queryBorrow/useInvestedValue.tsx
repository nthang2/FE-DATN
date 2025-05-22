import { useMemo } from 'react';
import { findTokenInfoByToken, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { useDepositState } from 'src/views/Borrow/state/hooks';
import { convertToUsd } from 'src/views/Borrow/utils';
import useQueryDepositValue from '../queryMyPortfolio/useQueryDepositValue';
import useMyPortfolio from '../queryMyPortfolio/useMyPortfolio';
import { useCrossModeState } from 'src/states/hooks';
import { TokenName } from 'src/libs/crypto-icons';

const useInvestedValue = () => {
  const { data: listPrice } = useQueryAllTokensPrice();
  const { asset } = useMyPortfolio();
  const [depositItems] = useDepositState();
  const { data: depositedValue } = useQueryDepositValue();
  const [crossMode] = useCrossModeState();

  //Already minted by deposit address
  const yourBorrowByAddress = useMemo(() => {
    const mintedByAddress = asset ? asset[depositItems[0].address]?.usdaiToRedeem : 0;
    if (crossMode) {
      const usdAiInfo = mapNameToInfoSolana[TokenName.USDAI];
      const mintedValueCrossMode = asset?.[usdAiInfo.address];

      return mintedValueCrossMode ? Number(mintedValueCrossMode?.usdaiToRedeem) : 0;
    }

    return mintedByAddress ? Number(mintedByAddress) : 0;
  }, [asset, crossMode, depositItems]);

  //Already deposit by deposit address
  const depositedByAddress = useMemo(() => {
    if (!depositedValue || !listPrice) return 0;
    if (crossMode) {
      const totalDeposited = Object.values(asset || {}).reduce((total, curr) => {
        return total + Number(curr.depositedUSD);
      }, 0);

      return totalDeposited ? Number(totalDeposited) : 0;
    }

    const depositAddress = depositItems[0].address;
    const deposited = convertToUsd(depositAddress, depositedValue[depositAddress], listPrice) || 0;

    return deposited;
  }, [asset, crossMode, depositItems, depositedValue, listPrice]);

  //Total deposit include already deposit amount and input amount
  const totalDepositValue = useMemo(() => {
    if (crossMode && depositItems.length > 1) {
      const totalPrice = depositItems.reduce((total, curr) => {
        return total + Number(curr.price);
      }, 0);

      return totalPrice + depositedByAddress;
    }
    return depositItems[0].price + depositedByAddress;
  }, [crossMode, depositItems, depositedByAddress]);

  const maxLtv = useMemo(() => {
    if (crossMode && asset) {
      const totalCollateralValue = depositItems.reduce((total, curr) => {
        const tokenInfo = findTokenInfoByToken(curr.address);
        return total + Number(curr.price) * Number(tokenInfo?.ratio || 0.3);
      }, 0);

      const collaboratedValueRatio = Object.values(asset)
        .filter((item) => item.depositedUSD > 0)
        .reduce((total, item) => {
          const key = item.name as keyof typeof mapNameToInfoSolana;
          const tokenInfo = mapNameToInfoSolana[key];

          return total + Number(item.depositedUSD) * Number(tokenInfo?.ratio || 0.3);
        }, 0);

      const collaboratedTotalPrice = Object.values(asset)
        .filter((item) => item.depositedUSD > 0)
        .reduce((total, item) => {
          return total + Number(item.depositedUSD);
        }, 0);

      const totalPrice = depositItems.reduce((total, curr) => {
        return total + Number(curr.price);
      }, 0);

      const ltv = ((totalCollateralValue + collaboratedValueRatio) / (totalPrice + collaboratedTotalPrice)) * 100;
      const fallbackRatio = Number(findTokenInfoByToken(depositItems[0].address)?.ratio) * 100;

      return ltv || fallbackRatio || 30;
    }

    if (depositItems[0]) {
      const tokenInfo = findTokenInfoByToken(depositItems[0].address);
      return Number(tokenInfo?.ratio) * 100;
    }

    return 30;
  }, [asset, crossMode, depositItems]);

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
