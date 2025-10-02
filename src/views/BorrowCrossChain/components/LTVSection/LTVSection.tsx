import { Box, Slider, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import FormatSmallNumber from 'src/components/General/FormatSmallNumber/FormatSmallNumber';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPriceUniversal from 'src/hooks/useQueryAllTokensPriceUniversal';
import useMyPortfolioUniversal from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useMyPortfolioUniversal';
import { TokenName } from 'src/libs/crypto-icons';
import { decimalFlood } from 'src/utils/format';
import { marks } from '../../constant';
import { useBorrowCrossState, useBorrowCrossSubmitState, useDepositCrossState } from '../../state/hooks';
import { convertToAmountToken, convertToUsd, validateBorrowItem } from '../../utils';
import CustomMark from '../BorrowSlide/CustomMark';
import CustomThumb from '../BorrowSlide/CustomThumb';
import CustomTrack from '../BorrowSlide/CustomTrack';
import useInvestedValueUniversal from 'src/hooks/useQueryHook/queryBorrowUniversal/useInvestedValueUniversal';

const minZoom = 0;
const maxZoom = 100;
const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];

const LTVSection = () => {
  const [borrowState, setBorrowState] = useBorrowCrossState();
  const [depositItems] = useDepositCrossState();
  const { data: listPrice, status: priceStatus } = useQueryAllTokensPriceUniversal();
  const [borrowSubmitted] = useBorrowCrossSubmitState();
  const [isSubmitted] = useBorrowCrossSubmitState();
  const { totalDepositValue, yourBorrowByAddress, maxLtv, depositedByAddress, maxLiquidationThreshold } = useInvestedValueUniversal();
  const { status: portfolioStatus } = useMyPortfolioUniversal();

  const [sliderValue, setSliderValue] = useState<number | number[]>(0);

  const markList = useMemo(() => {
    return [...marks, { value: maxLiquidationThreshold }, { value: maxLtv || 100 }];
  }, [maxLiquidationThreshold, maxLtv]);
  //Total borrow include already mint amount and input amount
  const borrowPercent = useMemo(() => {
    return ((borrowState.price + yourBorrowByAddress) / totalDepositValue) * 100;
  }, [borrowState.price, totalDepositValue, yourBorrowByAddress]);

  //Min ltv for mint field not smaller than 0
  const minLTV = useMemo(() => {
    return (yourBorrowByAddress / depositedByAddress) * 100;
  }, [depositedByAddress, yourBorrowByAddress]);

  const handleChangeSlider = (value: number | number[]) => {
    if (isSubmitted) return;
    let sliderCommitValue = value;
    if (!maxLtv || Number(value) > maxLtv) {
      sliderCommitValue = maxLtv;
    }

    const borrowValue = (Number(sliderCommitValue) / 100) * totalDepositValue - yourBorrowByAddress;
    const minValue = borrowValue < 0 ? 0 : Number(decimalFlood(borrowValue, usdaiInfo.decimals));
    const borrowAmount = convertToAmountToken(borrowState.address, minValue.toString(), listPrice);
    const error = validateBorrowItem(Number(borrowAmount), borrowPercent, maxLtv);

    setBorrowState({
      ...borrowState,
      value: borrowAmount ? decimalFlood(borrowAmount, usdaiInfo.decimals) : '0',
      price: minValue,
      error: error,
    });
  };

  useEffect(() => {
    //Update slider when change mint input or change slider input
    //Slider input do not change directly SliderValue state it change borrowState and this eff update SliderValue state
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
  }, [borrowState, borrowPercent, maxLtv, minLTV]);

  useEffect(() => {
    //Update slider when change address deposit
    const price = convertToUsd(borrowState.address, borrowState.value, listPrice);
    const borrowPercent = ((price + yourBorrowByAddress) / totalDepositValue) * 100;
    if (borrowPercent > maxLtv) {
      handleChangeSlider(0);
    } else {
      handleChangeSlider(borrowPercent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositItems, yourBorrowByAddress]);

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
        <Typography variant="body2">Ratio of the minted value to the collateral value</Typography>
        <Typography variant="body2">max {decimalFlood(maxLtv, 2)}%</Typography>
      </Stack>

      <Box mt={3.5}>
        <ValueWithStatus
          status={[priceStatus, portfolioStatus]}
          skeletonStyle={{ width: '100%', height: '50px' }}
          value={
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
                  transform: `translate(${Number(sliderValue) > 1 ? '-120%' : '-50%'}, -50%)`,
                },
              }}
              disabled={borrowSubmitted || borrowPercent < 0}
            />
          }
        />

        {/* Label */}
        {/* <Stack width="100%" sx={{ alignItems: 'center', textAlign: 'center', display: { xs: 'none', md: 'none' } }}>
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
        </Stack> */}
      </Box>
    </BoxCustom>
  );
};

export default LTVSection;
