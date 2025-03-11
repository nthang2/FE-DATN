import { Box, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import HealthFactorChart from './HealthFactorChart';

export default function HealthFactor() {
  return (
    <BoxCustom
      sx={{
        background:
          'radial-gradient(54.44% 92.03% at 45.31% 45.56%, #464609 0%, #211509 50%, #1E1E18 100%),radial-gradient(117.19% 85.06% at 85.21% 14.94%, rgba(6, 38, 3, 0.8) 0%, rgba(33, 21, 9, 0) 50%, rgba(30, 30, 24, 0) 100%),radial-gradient(85.74% 327.55% at 12.17% 86.26%, rgba(51, 7, 30, 0.8) 0%, rgba(33, 21, 9, 0) 50%, rgba(30, 30, 24, 0) 100%),radial-gradient(214.19% 368.23% at 1.52% 1.91%, #100F02 0%, rgba(33, 21, 9, 0) 50%, rgba(33, 21, 9, 0) 100%)',
        borderRadius: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        minWidth: '332px',
        height: 'fit-content',
        padding: 3,
      }}
    >
      <Box className="flex-start">
        <Typography variant="h6">HealthFactor</Typography>
        <TooltipInfo title="HealthFactor" />
      </Box>
      <HealthFactorChart />
      <Box className="flex-space-between">
        <Box className="flex-start">
          <Typography>Liquidation Price</Typography>
          <TooltipInfo title="The price at which your collateral will be liquidated." />
        </Box>
        <ValueWithStatus status={['success']} value={'--'} />
      </Box>
      <Box className="flex-space-between">
        <Box className="flex-start">
          <Typography>Current ETH Price</Typography>
          <TooltipInfo title="The current market price of this collateral." />
        </Box>
        <ValueWithStatus status={['success']} value={'--'} />
      </Box>
    </BoxCustom>
  );
}
