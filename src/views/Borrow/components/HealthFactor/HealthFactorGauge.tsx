import { Box } from '@mui/material';
import HealthFactorMask from '/images/HealthFactorMask.png';

interface HealthFactorGaugeProps {
  healthFactorAngle: number;
  bgColor: string;
}

const HealthFactorGauge = ({ healthFactorAngle, bgColor }: HealthFactorGaugeProps) => {
  return (
    <Box
      sx={{
        mask: `url(${HealthFactorMask}) no-repeat 50% 50%`,
        maskSize: 'contain',
        width: '284px',
        // background: 'transparent',
        aspectRatio: 292 / 147,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFB6D9',
        border: 'none',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#434340',
        }}
      >
        <Box
          sx={{
            width: '100%',
            aspectRatio: 1,
            background: bgColor,
            transition: 'transform 0.3s ease-in-out',
            transform: `rotate(${healthFactorAngle}deg)`,
            overflow: 'hidden',
            '@keyframes rotate': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
          }}
        >
          <Box sx={{ height: '50%', backgroundColor: '#434340', width: '100%' }}></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HealthFactorGauge;
