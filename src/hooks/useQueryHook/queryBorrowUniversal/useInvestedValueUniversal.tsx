import { useEffect, useMemo, useState } from 'react';
import { findTokenInfoByToken } from 'src/constants/tokens/mapNameToInfo';
import {
  findTokenInfoByToken as findTokenInfoByTokenSOL,
  mapNameToInfoSolana,
} from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPriceUniversal from 'src/hooks/useQueryAllTokensPriceUniversal';
import { TokenName } from 'src/libs/crypto-icons';
import { liquidationThreshold } from 'src/views/Borrow/constant';
import { convertToUsd } from 'src/views/Borrow/utils';
import { useDepositCrossState, useSelectedNetworkDepositState } from 'src/views/BorrowCrossChain/state/hooks';
import useMyPortfolioUniversal from '../queryMyPortfolioUniversal/useMyPortfolioUniversal';
import useQueryDepositValueUniversal from '../queryMyPortfolioUniversal/useQueryDepositValue';
import useGetCrossDepository from './useGetCrossDepository';
import { simulateRate } from 'src/contracts/solana/contracts/LendingContractUniversal/utils';
import { BN } from 'src/utils';

const useInvestedValueUniversal = () => {
  const { data: listPrice } = useQueryAllTokensPriceUniversal();
  const { asset } = useMyPortfolioUniversal();
  const { data: depository } = useGetCrossDepository();
  const [depositItems] = useDepositCrossState();
  const { data: depositedValue } = useQueryDepositValueUniversal();
  const [depositNetwork] = useSelectedNetworkDepositState();
  const [rate, setRate] = useState(1);
  const crossMode = true;

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
    const totalPrice = depositItems.reduce((total, curr) => {
      return total + Number(curr.price);
    }, 0);

    return totalPrice + depositedByAddress;
  }, [depositItems, depositedByAddress]);

  const maxLtv = useMemo(() => {
    const tokenInfo = findTokenInfoByToken(depositItems[0].address, depositNetwork);
    return Number(tokenInfo?.ratio) * 100;
  }, [depositItems, depositNetwork]);

  const maxLiquidationThreshold = useMemo(() => {
    if (crossMode && asset) {
      const totalCollateralValue = depositItems.reduce((total, curr) => {
        const tokenInfo = findTokenInfoByTokenSOL(curr.address);
        const liquidationThresholdValue = liquidationThreshold[tokenInfo?.symbol as keyof typeof liquidationThreshold] || 0.3;
        return total + Number(curr.price) * Number(liquidationThresholdValue);
      }, 0);

      const collaboratedValueRatio = Object.values(asset)
        .filter((item) => item.depositedUSD > 0)
        .reduce((total, item) => {
          const key = item.name as keyof typeof mapNameToInfoSolana;
          const tokenInfo = mapNameToInfoSolana[key];
          const liquidationThresholdValue = liquidationThreshold[tokenInfo?.symbol as keyof typeof liquidationThreshold] || 0.3;

          return total + Number(item.depositedUSD) * Number(liquidationThresholdValue);
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
      const fallbackLiquidationThreshold =
        Number(liquidationThreshold[findTokenInfoByTokenSOL(depositItems[0].address)?.symbol as keyof typeof liquidationThreshold]) * 100;

      return ltv || fallbackLiquidationThreshold || 30;
    }

    if (depositItems[0]) {
      const tokenInfo = findTokenInfoByTokenSOL(depositItems[0].address);
      const liquidationThresholdValue = liquidationThreshold[tokenInfo?.symbol as keyof typeof liquidationThreshold] || 0.3;
      return Number(liquidationThresholdValue) * 100;
    }

    return 30;
  }, [asset, crossMode, depositItems]);

  const maxBorrowPrice = useMemo(() => {
    const borrowPrice = (Number(maxLtv) / 100) * totalDepositValue - yourBorrowByAddress;
    return borrowPrice;
  }, [maxLtv, totalDepositValue, yourBorrowByAddress]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (depository) {
        const rate = simulateRate(
          BN(depository.rate.toNumber()),
          BN(depository.rho.toNumber()),
          BN(depository.duty.toNumber()),
          BN(depository.base.toNumber()),
          BN(depository.debtTotal.toNumber()),
          BN(Date.now() / 1000 + 60)
        );
        setRate(BN(rate.newRate).div(BN(1e12)).toNumber());
      }
    }, 10000); //10s update rate

    return () => {
      clearInterval(interval);
    };
  }, [depository]);

  return {
    yourBorrowByAddress,
    depositedByAddress,
    totalDepositValue,
    maxLtv,
    maxLiquidationThreshold,
    maxBorrowPrice,
    rate,
  };
};

export default useInvestedValueUniversal;
