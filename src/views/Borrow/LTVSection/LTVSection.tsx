import { Box, Slider, Stack, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';
import CustomMark from '../components/BorrowSlide/CustomMark';
import CustomThumb from '../components/BorrowSlide/CustomThumb';
import CustomTrack from '../components/BorrowSlide/CustomTrack';
import { marks, labelMark } from '../constant';

const minZoom = 1;
const maxZoom = 100;

const LTVSection = () => {
  return (
    <BoxCustom>
      <Stack justifyContent="space-between">
        <Typography variant="h6" fontWeight={700}>
          Loan to Value (LTV)
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          0.00%
        </Typography>
      </Stack>

      <Stack justifyContent="space-between" mt={1.5}>
        <Typography variant="body2">Ratio of the collateral value to the borrowed value</Typography>
        <Typography variant="body2">max 30.00%</Typography>
      </Stack>

      <Box mt={3.5}>
        <Slider
          marks={marks}
          min={minZoom}
          max={maxZoom}
          value={38}
          disabled
          onChange={(_e, value) => console.log(value)}
          slots={{ thumb: CustomThumb, mark: CustomMark, track: CustomTrack }}
          sx={{
            bgcolor: '#333331',
            ml: 1.5,
            borderRadius: '100px',
            '& .MuiSlider-rail': {
              bgcolor: 'transparent',
            },
          }}
        />

        {/* Label */}
        <Stack width="100%" sx={{ alignItems: 'center', textAlign: 'center' }}>
          {marks.map((mark, index) => {
            let width = mark.value;
            if (index !== 0) {
              if (index !== marks.length - 1) {
                width = marks[index].value - marks[index - 1].value;
              } else {
                width = 100 - marks[index - 1].value;
              }
            }

            return (
              <Typography key={mark.value} width={`${width}%`}>
                {labelMark[index].label}
              </Typography>
            );
          })}
        </Stack>
      </Box>
    </BoxCustom>
  );
};

export default LTVSection;
