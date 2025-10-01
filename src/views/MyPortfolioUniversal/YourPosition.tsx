import { Box, Typography } from '@mui/material';
import { TokenName } from 'src/libs/crypto-icons';
import { useMemo } from 'react';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import {
  findTokenInfoByToken,
  listTokenAvailable,
  mapNameToInfoSolana,
  TSolanaToken,
} from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useMyPortfolioUniversal from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useMyPortfolioUniversal';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useStakedInfo from 'src/hooks/useQueryHook/queryVault/useStakedInfo';
import { useCrossModeState } from 'src/states/hooks';
import useSolanaBalanceToken, { useSolanaBalanceTokens } from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import SliderCustom from './components/SliderCustom';

export default function YourPosition() {
  const { address } = useSummarySolanaConnect();
  const { data: depositValueData, status: statusQueryDepositValue } = useQueryDepositValue();
  const { asset, status: statusMyPortfolio } = useMyPortfolioUniversal();
  const { data: tokensPrice, status: statusQueryAllTokensPrice } = useQueryAllTokensPrice();
  const { data: dataStakedInfo, status: statusStakedInfo } = useStakedInfo();
  const { balance: balanceUSDAI } = useSolanaBalanceToken(address, TokenName.USDAI);
  const [crossMode] = useCrossModeState();
  const balance = useSolanaBalanceTokens(address, Object.keys(listTokenAvailable) as Array<TSolanaToken>);

  const collateralDepositedInfo = useMemo(() => {
    if (asset) {
      const totalDepositedUsd = BN(Object.values(asset).reduce((total, item) => total + item.depositedUSD, 0));
      const totalBalanceTokens = BN(
        Object.values(balance).reduce((total, item) => {
          const balanceInWalletByUsd = BN(item.balance).multipliedBy(asset?.[item.address]?.priceUSD || 0);
          return total + balanceInWalletByUsd.toNumber();
        }, 0)
      );

      return { totalDepositedUsd, totalBalanceTokens };
    }

    return { totalDepositedUsd: BN(0), totalBalanceTokens: BN(0) };
  }, [asset, balance]);
  const collateralDepositedMaxValue = collateralDepositedInfo.totalBalanceTokens.plus(collateralDepositedInfo.totalDepositedUsd);

  const totalDepositValueRatio = useMemo(() => {
    if (depositValueData && Object.keys(depositValueData).length > 0 && tokensPrice) {
      return Object.entries(depositValueData).reduce((a, [k, v]) => {
        const total =
          a + Number(v) * Number(tokensPrice[k]?.price * Number(findTokenInfoByToken(k) ? findTokenInfoByToken(k)?.ratio ?? 0.3 : 1));
        return total;
      }, 0);
    }
  }, [depositValueData, tokensPrice]);

  const totalYourBorrowValue = useMemo(() => {
    if (crossMode && asset) {
      const { usdaiToRedeem } = asset[mapNameToInfoSolana[TokenName.USDAI].address];
      return usdaiToRedeem;
    }

    if (asset && Object.keys(asset).length > 0 && Object.values(asset).find((a) => a.usdaiToRedeem)) {
      return Object.values(asset).reduce((a, b) => {
        if (!crossMode && b.contractAddress === mapNameToInfoSolana[TokenName.USDAI].address) {
          return a;
        }

        return a + Number(b.usdaiToRedeem);
      }, 0);
    }
  }, [asset, crossMode]);

  const maxBorrowAbleValue = useMemo(() => {
    if (crossMode && asset) {
      const { maxAvailableToMint, usdaiToRedeem } = asset[mapNameToInfoSolana[TokenName.USDAI].address];
      return Number(maxAvailableToMint || 0) + usdaiToRedeem;
    }

    if (totalDepositValueRatio && totalYourBorrowValue) {
      return Number(totalDepositValueRatio) < totalYourBorrowValue
        ? Number(totalYourBorrowValue) // Nếu borrow vượt quá mức có thể vay, giới hạn theo borrow
        : Number(totalDepositValueRatio);
    }
    return Number(totalDepositValueRatio) || 0;
  }, [asset, crossMode, totalDepositValueRatio, totalYourBorrowValue]);

  return (
    <BoxCustom sx={{ bgcolor: 'background.default' }}>
      <Box display={'flex'} justifyContent="space-between">
        <Typography variant="h5">Your Position</Typography>
        {/* <CrossModeSwitch /> */}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">Collateral Deposited</Typography>
          <ValueWithStatus
            status={[statusQueryDepositValue, statusMyPortfolio, statusQueryAllTokensPrice]}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {formatNumber(collateralDepositedInfo.totalDepositedUsd, { fractionDigits: 2, prefix: '$' })}
              </Typography>
            }
          />
        </Box>
        <SliderCustom
          status={[statusQueryDepositValue, statusMyPortfolio, statusQueryAllTokensPrice]}
          maxValue={collateralDepositedMaxValue.toNumber()}
          value={collateralDepositedInfo.totalDepositedUsd.toNumber()}
          textFill="Amount of your deposited assets used as collateral."
        />
      </Box>
      <Box sx={{ mb: 4, mt: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">Minted</Typography>
          <ValueWithStatus
            status={[statusQueryDepositValue, statusMyPortfolio, statusQueryAllTokensPrice]}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {formatNumber(totalYourBorrowValue, { fractionDigits: 2, prefix: '$', fallback: '$0' })}
              </Typography>
            }
          />
        </Box>
        <SliderCustom
          status={[statusQueryDepositValue, statusMyPortfolio, statusQueryAllTokensPrice]}
          value={totalYourBorrowValue}
          maxValue={maxBorrowAbleValue}
          textFill="Minted amount of USDAI against your maximum mintable amount."
        />
      </Box>
      <Box sx={{ mb: 4, mt: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">Staked</Typography>
          <ValueWithStatus
            status={[statusQueryDepositValue, statusMyPortfolio, statusQueryAllTokensPrice]}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {formatNumber(Number(dataStakedInfo?.amount), {
                  prefix: '$',
                })}
              </Typography>
            }
          />
        </Box>
        <SliderCustom
          status={[statusStakedInfo]}
          value={Number(dataStakedInfo?.amount)}
          maxValue={
            // eslint-disable-next-line no-extra-boolean-cast
            Boolean(Number(balanceUSDAI.toString()) + Number(dataStakedInfo?.amount))
              ? Number(balanceUSDAI.toString()) + Number(dataStakedInfo?.amount)
              : undefined
          }
          textFill="Staked amount of USDAI."
        />
      </Box>
    </BoxCustom>
  );
}
