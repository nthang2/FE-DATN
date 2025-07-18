import { Box, Chip, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import HealthFactorNumberSvg from 'src/assets/HealthFactorNumberSvg';
import { useMemo } from 'react';
import HealthFactorGauge from './HealthFactorGauge';
import { BN } from 'src/utils';

interface HealthFactorProps {
  healthFactor: string;
}

export default function HealthFactor({ healthFactor }: HealthFactorProps) {
  const healthFactorAngle = useMemo(() => {
    if (healthFactor == 'Infinity' || Number(healthFactor) > 4) {
      return 180;
    } else {
      return ((Number(healthFactor) - 1) / 3) * 180;
    }
  }, [healthFactor]);

  const healthFactorRank = useMemo(() => {
    if (healthFactor) {
      if (healthFactor == 'Infinity') {
        return { rank: 'Healthy', color: '#34D564' };
      } else if (BN(healthFactor).isLessThanOrEqualTo(1.2)) {
        return { rank: 'Critical', color: '#E9321A' };
      } else if (BN(healthFactor).isLessThanOrEqualTo(1.5)) {
        return { rank: 'Risky', color: '#FF8B3E' };
      } else if (BN(healthFactor).isLessThanOrEqualTo(3)) {
        return { rank: 'Moderate', color: '#FFC95D' };
      } else {
        return { rank: 'Healthy', color: '#08DBA4' };
      }
    } else {
      return { rank: '--', color: 'text.primary' };
    }
  }, [healthFactor]);

  const healthFactorColor = `conic-gradient(from 0deg, #fff 0deg, #fff 90deg, ${healthFactorRank.color} ${healthFactorAngle}deg)`;

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

      <Box sx={{ position: 'relative' }}>
        <HealthFactorGauge healthFactorAngle={healthFactorAngle} bgColor={healthFactorColor} />
        <Box sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '280px', height: '140px' }}>
          <HealthFactorNumberSvg />
        </Box>
        <Box sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <Chip label={healthFactorRank.rank} sx={{ mb: 3, backgroundColor: healthFactorRank.color, color: '#000' }} />
          <Typography variant="h4">{healthFactor}</Typography>
        </Box>
      </Box>

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
