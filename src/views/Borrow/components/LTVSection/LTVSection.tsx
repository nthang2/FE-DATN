import { Box, Slider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';
import { labelMark, marks } from '../../constant';
import { useBorrowState } from '../../state/hooks';
import CustomMark from '../BorrowSlide/CustomMark';
import CustomThumb from '../BorrowSlide/CustomThumb';
import CustomTrack from '../BorrowSlide/CustomTrack';

const minZoom = 1;
const maxZoom = 100;
const maxValue = 500;

const LTVSection = () => {
  const [borrowState, setBorrowState] = useBorrowState();
  const [value, setValue] = useState<number | number[]>(0);

  const handleChangeSlider = (value: number | number[]) => {
    if (Number(value) > 80) {
      return;
    }

    const borrowValue = (Number(value) * maxValue) / 100;
    setBorrowState({ ...borrowState, value: borrowValue.toString() });
  };

  useEffect(() => {
    const percent = (100 * Number(borrowState.value)) / maxValue;
    setValue(percent);
  }, [borrowState]);

  return (
    <BoxCustom>
      <Stack justifyContent="space-between">
        <Typography variant="h6" fontWeight={700}>
          Loan to Value (LTV)
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          {value}%
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
          value={value}
          onChange={(_e, value) => handleChangeSlider(value)}
          slots={{ mark: CustomMark, track: CustomTrack, thumb: CustomThumb }}
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
