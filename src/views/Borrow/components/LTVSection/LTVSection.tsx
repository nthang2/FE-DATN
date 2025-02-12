import { Box, Slider, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import FormatSmallNumber from 'src/components/General/FormatSmallNumber/FormatSmallNumber';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { labelMark, marks } from '../../constant';
import useMaxLtv from '../../hooks/useMaxLtv';
import { useBorrowState, useDepositState } from '../../state/hooks';
import { convertToAmountToken } from '../../utils';
import CustomMark from '../BorrowSlide/CustomMark';
import CustomThumb from '../BorrowSlide/CustomThumb';
import CustomTrack from '../BorrowSlide/CustomTrack';

const minZoom = 0;
const maxZoom = 100;

const LTVSection = () => {
  const [borrowState, setBorrowState] = useBorrowState();
  const [depositItems] = useDepositState();
  const { data: listPrice } = useQueryAllTokensPrice();
  const { maxLtv } = useMaxLtv();

  const [sliderValue, setSliderValue] = useState<number | number[]>(0);

  const markList = useMemo(() => [...marks, { value: maxLtv || 100 }], [maxLtv]);
  const totalDepositValue = useMemo(() => depositItems.reduce((total, item) => total + item?.price, 0), [depositItems]);
  const borrowPercent = useMemo(() => {
    return (borrowState.price / totalDepositValue) * 100;
  }, [borrowState.price, totalDepositValue]);

  const handleChangeSlider = (value: number | number[]) => {
    if (!maxLtv || Number(value) > maxLtv) {
      return;
    }

    const borrowValue = (Number(value) / 100) * totalDepositValue;
    const borrowAmount = convertToAmountToken(borrowState.address, borrowValue.toString(), listPrice);
    setBorrowState({
      ...borrowState,
      value: borrowAmount.toString(),
      price: borrowValue,
    });
  };

  useEffect(() => {
    if (!maxLtv) return;
    if (!borrowPercent) {
      setSliderValue(0);
      return;
    }

    if (borrowPercent > maxLtv) {
      setSliderValue(maxLtv);
      return;
    }

    setSliderValue(borrowPercent);
  }, [borrowState, borrowPercent, maxLtv]);

  return (
    <BoxCustom>
      <Stack justifyContent="space-between">
        <Typography variant="h6" fontWeight={700}>
          Loan to Value (LTV)
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          <FormatSmallNumber value={Number(sliderValue)} />%
        </Typography>
      </Stack>

      <Stack justifyContent="space-between" mt={1.5}>
        <Typography variant="body2">Ratio of the collateral value to the borrowed value</Typography>
        <Typography variant="body2">max {maxLtv?.toFixed(2)}%</Typography>
      </Stack>

      <Box mt={3.5}>
        <Slider
          marks={markList}
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
            '& .MuiSlider-thumb': {
              transform: `translate(${Number(sliderValue) > 1 ? '-90%' : '-50%'}, -50%)`,
            },
          }}
          disabled={borrowPercent < 0}
        />

        {/* Label */}
        <Stack width="100%" sx={{ alignItems: 'center', textAlign: 'center', display: { xs: 'none', md: 'flex' } }}>
          {markList.map((mark, index) => {
            let width = mark.value;
            if (index !== 0) {
              if (index !== markList.length - 1) {
                width = markList[index].value - markList[index - 1].value;
              } else {
                width = 100 - markList[index - 1].value;
              }
            }

            return (
              <Typography key={mark.value} width={`${width}%`}>
                {labelMark[index]?.label}
              </Typography>
            );
          })}
        </Stack>
      </Box>
    </BoxCustom>
  );
};

export default LTVSection;
