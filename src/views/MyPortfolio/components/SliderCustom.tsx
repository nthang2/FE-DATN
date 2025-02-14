import { Box, Skeleton, Typography } from '@mui/material';
import { compactNumber } from 'src/utils/format';

export default function SliderCustom({ maxValue, value }: { maxValue: number | undefined; value: number | undefined }) {
  const position = [0, 2, 3, 4, 5, 6, 7, 8, 10];

  return (
    <Box sx={{ position: 'relative', bgcolor: '#2A2B22', height: '24px', borderRadius: '1000px', border: '0.5px solid #919283', mt: 1 }}>
      {position.map((item, index) => {
        return (
          <Box key={index}>
            <Box
              sx={{ width: '0.5px', height: '6px', bgcolor: 'info.main', position: 'absolute', bottom: '-10px', left: `${item * 10}%` }}
            />
            {item % 2 === 0 && (
              <Typography
                variant="caption2"
                sx={{
                  position: 'absolute',
                  bottom: '-30px',
                  left: index == 0 ? '1%' : index == 8 ? '99%' : `${item * 10}%`,
                  color: 'info.main',
                  transform: 'translateX(-50%)',
                }}
              >
                {maxValue != undefined ? (
                  compactNumber(maxValue != undefined ? (maxValue / 10) * item : 0 * item * 10)
                ) : (
                  <Skeleton sx={{ width: '20px' }} />
                )}
              </Typography>
            )}
          </Box>
        );
      })}
      {maxValue != undefined && value != undefined && (
        <Box
          sx={{
            bgcolor: '#FCFFD8',
            height: '24px',
            borderRadius: '1000px',
            border: '0.5px solid #919283',
            width: `${(value / maxValue) * 100}%`,
          }}
        />
      )}
    </Box>
  );
}
