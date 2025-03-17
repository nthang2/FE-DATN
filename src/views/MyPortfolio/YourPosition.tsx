import { Box, Typography } from '@mui/material';
import { TokenName } from 'crypto-token-icon';
import { useMemo } from 'react';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useMyPortfolio from 'src/hooks/useQueryHook/queryMyPortfolio/useMyPortfolio';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useStakedInfo from 'src/hooks/useQueryHook/queryVault/useStakedInfo';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { formatNumber } from 'src/utils/format';
import SliderCustom from './components/SliderCustom';
import CrossModeSwitch from 'src/components/CrossModeSwitch/CrossModeSwitch';

export default function YourPosition() {
  const { address } = useSummarySolanaConnect();
  const { data: depositValueData, status: statusQueryDepositValue } = useQueryDepositValue();
  const { asset, status: statusMyPortfolio } = useMyPortfolio();
  const { data: tokensPrice, status: statusQueryAllTokensPrice } = useQueryAllTokensPrice();
  const { data: dataStakedInfo, status: statusStakedInfo } = useStakedInfo();
  const { balance: balanceUSDAI } = useSolanaBalanceToken(address, TokenName.USDAI);

  const totalDepositValue = useMemo(() => {
    if (depositValueData && Object.keys(depositValueData).length > 0 && tokensPrice) {
      return Object.entries(depositValueData).reduce((a, [k, v]) => a + Number(v) * Number(tokensPrice[k]?.price ?? 1), 0);
    }
  }, [depositValueData, tokensPrice]);

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
    if (asset && Object.keys(asset).length > 0 && Object.values(asset).find((a) => a.usdaiToRedeem)) {
      return Object.values(asset).reduce((a, b) => a + Number(b.usdaiToRedeem), 0);
    }
  }, [asset]);

  const maxBorrowAbleValue = useMemo(() => {
    if (totalDepositValueRatio && totalYourBorrowValue) {
      return Number(totalDepositValueRatio) < totalYourBorrowValue
        ? Number(totalYourBorrowValue) // Nếu borrow vượt quá mức có thể vay, giới hạn theo borrow
        : Number(totalDepositValueRatio);
    }
    return Number(totalDepositValueRatio) || 0;
  }, [totalDepositValueRatio, totalYourBorrowValue]);

  return (
    <BoxCustom>
      <Box display={'flex'} justifyContent="space-between">
        <Typography variant="h5">Your Position</Typography>
        <CrossModeSwitch />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">Collateral Deposited</Typography>
          <ValueWithStatus
            status={[statusQueryDepositValue, statusMyPortfolio, statusQueryAllTokensPrice]}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {formatNumber(totalDepositValue, { fractionDigits: 2, prefix: '$' })}
              </Typography>
            }
          />
        </Box>
        <SliderCustom
          status={[statusQueryDepositValue, statusMyPortfolio, statusQueryAllTokensPrice]}
          maxValue={totalDepositValue}
          value={totalDepositValue}
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
                {formatNumber(totalYourBorrowValue, { fractionDigits: 2, prefix: '$' })}
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
