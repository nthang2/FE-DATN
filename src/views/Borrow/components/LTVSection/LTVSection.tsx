import { Box, Slider, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';
import { labelMark, marks } from '../../constant';
import { useBorrowState, useDepositState } from '../../state/hooks';
import CustomMark from '../BorrowSlide/CustomMark';
import CustomThumb from '../BorrowSlide/CustomThumb';
import CustomTrack from '../BorrowSlide/CustomTrack';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { convertToUsd } from '../../utils';

const minZoom = 0;
const maxZoom = 100;
const maxBorrowPercent = 30;

const LTVSection = () => {
  const [borrowState, setBorrowState] = useBorrowState();
  const [depositItems] = useDepositState();
  const { data: listPrice } = useQueryAllTokensPrice();

  const [sliderValue, setSliderValue] = useState<number | number[]>(0);

  const totalDepositValue = useMemo(() => depositItems.reduce((total, item) => total + item.price, 0), [depositItems]);
  const borrowPercent = useMemo(() => {
    if (borrowState.price > totalDepositValue) return -1;

    return (borrowState.price / totalDepositValue) * 100;
  }, [borrowState.price, totalDepositValue]);

  const handleChangeSlider = (value: number | number[]) => {
    if (Number(value) > maxBorrowPercent) {
      return;
    }

    const borrowValue = (Number(value) / 100) * totalDepositValue;
    setBorrowState({
      ...borrowState,
      value: borrowValue.toString(),
      price: convertToUsd(borrowState.address, borrowValue.toString(), listPrice),
    });
  };

  useEffect(() => {
    if (!borrowPercent) {
      setSliderValue(0);
      return;
    }

    if (borrowPercent > maxBorrowPercent) {
      setSliderValue(maxBorrowPercent);
      return;
    }

    setSliderValue(borrowPercent);
  }, [borrowState, borrowPercent]);

  return (
    <BoxCustom>
      <Stack justifyContent="space-between">
        <Typography variant="h6" fontWeight={700}>
          Loan to Value (LTV)
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          {Number(sliderValue).toFixed(2)}%
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
          value={sliderValue}
          step={0.5}
          onChange={(_e, value) => handleChangeSlider(value)}
          slots={{ mark: CustomMark, track: CustomTrack, thumb: CustomThumb }}
          sx={{
            bgcolor: '#333331',
            borderRadius: '100px',
            '& .MuiSlider-rail': {
              bgcolor: 'transparent',
            },
          }}
          disabled={borrowPercent < 0}
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
