import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useQueryYourBorrow from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryYourBorrow';
import { formatNumber } from 'src/utils/format';
import SliderCustom from './components/SliderCustom';

export default function YourPosition() {
  const { data: depositValueData, status } = useQueryDepositValue();
  const { data: yourBorrowData } = useQueryYourBorrow();

  const totalDepositValue = useMemo(() => {
    if (depositValueData && Object.keys(depositValueData).length > 0) {
      return Object.values(depositValueData).reduce((a, b) => a + Number(b), 0);
    }
  }, [depositValueData]);

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
            status={status}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {formatNumber(totalDepositValue)}
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
            status={status}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {totalDepositValue != undefined && formatNumber(totalDepositValue * 0.3)}
              </Typography>
            }
          />
        </Box>
        <SliderCustom value={totalYourBorrowValue} maxValue={totalDepositValue && Number(totalDepositValue) * 0.3} />
      </Box>
    </BoxCustom>
  );
}
