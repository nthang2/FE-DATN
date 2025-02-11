import { Box, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/common/BoxCustom/BoxCustom';
import ValueWithStatus from 'src/components/common/ValueWithStatus/ValueWithStatus';
import { FetchStatus } from 'src/constants';
import { formatNumber } from 'src/utils/format';
import SliderCustom from './components/SliderCustom';

export default function YourPosition() {
  // const getCollateral = async () => {
  //   if (!wallet || !wallet.wallet?.adapter.publicKey) return;
  //   const lendingContract = new LendingContract(wallet);
  //   const result = await lendingContract.
  // };

  return (
    <BoxCustom>
      <Typography variant="h5">Your Position</Typography>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">Collateral Deposited</Typography>
          <ValueWithStatus
            status={FetchStatus.SUCCESS}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {formatNumber(2272)}
              </Typography>
            }
          />
        </Box>
        <SliderCustom />
      </Box>
      <Box sx={{ mb: 4, mt: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">Borrow</Typography>
          <ValueWithStatus
            status={FetchStatus.SUCCESS}
            value={
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {formatNumber(2272)}
              </Typography>
            }
          />
        </Box>
        <SliderCustom />
      </Box>
    </BoxCustom>
  );
}
