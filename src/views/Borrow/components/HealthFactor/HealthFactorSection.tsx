import { Box, Chip, SxProps, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import HealthFactorNumberSvg from 'src/assets/HealthFactorNumberSvg';
import { BN } from 'src/utils';
import HealthFactorGauge from './HealthFactorGauge';

interface HealthFactorProps {
  healthFactor: string;
  styleSvgWrapper?: SxProps;
}

const HealthFactorSection = ({ healthFactor, styleSvgWrapper }: HealthFactorProps) => {
  const healthFactorAngle = useMemo(() => {
    if (BN(healthFactor).isLessThanOrEqualTo(1)) {
      return 0;
    }
    if (healthFactor == 'Infinity' || Number(healthFactor) > 4) {
      return 180;
    } else {
      return ((Number(healthFactor) - 1) / 3) * 180;
    }
  }, [healthFactor]);

  const healthFactorNumber = useMemo(() => {
    if (healthFactor == 'Infinity' || BN(healthFactor).isGreaterThan(15)) {
      return '15+';
    }
    return healthFactor;
  }, [healthFactor]);

  const healthFactorRank = useMemo(() => {
    if (healthFactor) {
      if (healthFactor == 'Infinity' || BN(healthFactor).isLessThan(1)) {
        return { rank: 'Healthy', color: '#34D564' };
      } else if (BN(healthFactor).isLessThanOrEqualTo(1.6)) {
        return { rank: 'Critical', color: '#E9321A' };
      } else if (BN(healthFactor).isLessThanOrEqualTo(2.5)) {
        return { rank: 'Risky', color: '#FF8B3E' };
      } else if (BN(healthFactor).isLessThanOrEqualTo(3.2)) {
        return { rank: 'Moderate', color: '#FFC95D' };
      } else {
        return { rank: 'Healthy', color: '#08DBA4' };
      }
    } else {
      return { rank: '--', color: 'text.primary' };
    }
  }, [healthFactor]);

  const healthFactorColor = `conic-gradient(from 0deg, #fff 153deg, #fff 90deg, ${healthFactorRank.color} 274deg)`;

  return (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <HealthFactorGauge healthFactorAngle={healthFactorAngle} bgColor={healthFactorColor} />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '99px',
          ...styleSvgWrapper,
        }}
      >
        <HealthFactorNumberSvg />
      </Box>
      <Box sx={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <Chip
          label={healthFactorRank.rank}
          sx={{
            mb: 2,
            backgroundColor: healthFactorRank.color,
            color: '#000',
            fontWeight: 600,
            height: '20px',
            fontSize: '12px',
            '& span': { padding: '0 8px', lineHeight: 1 },
          }}
        />
        <Typography variant="h2" lineHeight={0.75}>
          {healthFactorNumber}
        </Typography>
      </Box>
    </Box>
  );
};

export default HealthFactorSection;
