import { Box, Typography } from '@mui/material';
import { compactNumber } from 'src/utils/format';

export default function SliderCustom() {
  const maxValue = 100000;
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
                  bottom: '-27px',
                  left: index == 0 ? '0.2%' : index == 8 ? '97%' : `${item * 10 - 1}%`,
                  color: 'info.main',
                }}
              >
                {compactNumber(maxValue * item * 10)}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
