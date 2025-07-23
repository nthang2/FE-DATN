import { Box, Typography, useMediaQuery } from '@mui/material';
import { decimalFlood } from 'src/utils/format';

const CustomMark = ({ ...props }) => {
  const dataIndex = props['data-index'];
  const isMaxValueMark = dataIndex === 3;
  const isLiquidationMark = dataIndex === 2;
  const isMobile = useMediaQuery('(max-width: 600px)');

  const maxValue: number = props.ownerState.marks[3].value;
  const liquidationValue: number = props.ownerState.marks[2].value;
  const bgcolor = dataIndex > 1 ? '#FCFFD8' : '#666662';
  const isOverflow = liquidationValue > 90;

  const positionLiquidationTop = !isMobile ? 40 : 55;

  return (
    <Box
      component="span"
      sx={{
        position: 'absolute',
        width: '2px',
        borderRadius: '1px',
        backgroundColor: 'currentColor',
        top: '50%',
        webkitTransform: 'translate(-1px, -50%)',
        mozTransform: 'translate(-1px, -50%)',
        msTransform: 'translate(-1px, -50%)',
        transform: 'translate(-1px, -50%)',
        bgcolor: isLiquidationMark ? 'error.dark' : bgcolor,
        height: '100%',
        display: !isMaxValueMark && !isLiquidationMark ? 'none' : 'block',
      }}
      {...props}
    >
      <Box position="relative" height="100%">
        {isMaxValueMark && (
          <Box position="absolute" top={-18}>
            <Typography variant="body3">{decimalFlood(maxValue, 2)}%</Typography>
          </Box>
        )}
        {isLiquidationMark && (
          <Box position="absolute" top={positionLiquidationTop} right={isOverflow ? '-35px' : 'unset'}>
            <Typography variant="body3" noWrap sx={{ color: 'error.dark' }}>
              {decimalFlood(liquidationValue, 2)}% Liquidation
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CustomMark;
