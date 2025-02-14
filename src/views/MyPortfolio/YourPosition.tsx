import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useQueryYourBorrow from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryYourBorrow';
import { formatNumber } from 'src/utils/format';
import SliderCustom from './components/SliderCustom';

export default function YourPosition() {
  const { data: depositValueData, status: statusQueryDepositValue } = useQueryDepositValue();
  const { data: yourBorrowData, status: statusQueryYourBorrow } = useQueryYourBorrow();
  const { data: tokensPrice, status: statusQueryAllTokensPrice } = useQueryAllTokensPrice();

  const totalDepositValue = useMemo(() => {
    if (depositValueData && Object.keys(depositValueData).length > 0 && tokensPrice) {
      return Object.entries(depositValueData).reduce((a, [k, v]) => a + Number(v) * Number(tokensPrice[k].price), 0);
    }
  }, [depositValueData, tokensPrice]);

  const totalDepositValueRatio = useMemo(() => {
    if (depositValueData && Object.keys(depositValueData).length > 0 && tokensPrice) {
      return Object.entries(depositValueData).reduce(
        (a, [k, v]) => a + Number(v) * Number(tokensPrice[k].price * Number(findTokenInfoByToken(k) ? findTokenInfoByToken(k)?.ratio : 1)),
        0
      );
    }
  }, [depositValueData, tokensPrice]);

  const totalYourBorrowValue = useMemo(() => {
    if (yourBorrowData && Object.keys(yourBorrowData).length > 0) {
      return Object.values(yourBorrowData).reduce((a, b) => a + Number(b), 0);
    }
  }, [yourBorrowData]);

  return (
    <BoxCustom>
      <Typography variant="h5">Your Position</Typography>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">Collateral Deposited</Typography>
          <ValueWithStatus
            status={[statusQueryDepositValue, statusQueryYourBorrow, statusQueryAllTokensPrice]}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {formatNumber(totalDepositValue, { fractionDigits: 2, prefix: '$' })}
              </Typography>
            }
          />
        </Box>
        <SliderCustom maxValue={totalDepositValue} value={totalDepositValue} />
      </Box>
      <Box sx={{ mb: 4, mt: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">Borrow</Typography>
          <ValueWithStatus
            status={[statusQueryDepositValue, statusQueryYourBorrow, statusQueryAllTokensPrice]}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {totalDepositValue != undefined
                  ? formatNumber(totalDepositValueRatio, { fractionDigits: 2, prefix: '$' })
                  : formatNumber(totalDepositValue, { fractionDigits: 2, prefix: '$' })}
              </Typography>
            }
          />
        </Box>
        <SliderCustom value={totalYourBorrowValue} maxValue={totalDepositValue && Number(totalDepositValueRatio)} />
      </Box>
    </BoxCustom>
  );
}
