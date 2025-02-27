import { Box, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { useEffect, useMemo } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useInvestedValue from 'src/hooks/useQueryHook/queryBorrow/useInvestedValue';
import useQueryYourBorrow from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryYourBorrow';
import { useBorrowState, useBorrowSubmitState, useDepositState } from '../../state/hooks';
import { convertToAmountToken, convertToUsd, validateBorrowItem } from '../../utils';
import DepositCustomInput from '../InputCustom/DepositCustomInput';
import BorrowPreview from './BorrowPreview';
import { regexConfigValue } from 'src/utils';

const BorrowSection = () => {
  const { data: listPrice } = useQueryAllTokensPrice();
  const [borrowState, setBorrowState] = useBorrowState();
  const [isSubmitted] = useBorrowSubmitState();
  const { data: yourBorrow } = useQueryYourBorrow();
  const [depositItems] = useDepositState();
  const { totalDepositValue, yourBorrowByAddress, maxLtv } = useInvestedValue();

  const mintedValueUsd = useMemo(() => {
    if (!yourBorrow) return 0;
    const currAdd = depositItems[0].address;

    return Number(yourBorrow[currAdd]);
  }, [depositItems, yourBorrow]);
  const isShowYourBorrow = !!mintedValueUsd && Number(mintedValueUsd) > 0;

  const handleChangeInput = (value: string) => {
    const price = convertToUsd(borrowState.address, value, listPrice);
    const borrowPercent = ((price + yourBorrowByAddress) / totalDepositValue) * 100;
    const error = validateBorrowItem(Number(value), borrowPercent, maxLtv);
    const inputValue = regexConfigValue(value);

    setBorrowState({
      ...borrowState,
      value: inputValue,
      price: price,
      error: error,
    });
  };

  const handleMax = () => {
    const borrowPrice = (Number(maxLtv) / 100) * totalDepositValue - yourBorrowByAddress;
    const minValue = borrowPrice < 0 ? 0 : borrowPrice;
    const borrowAmount = convertToAmountToken(borrowState.address, minValue.toString(), listPrice);

    setBorrowState({
      ...borrowState,
      value: borrowAmount ? borrowAmount.toString() : '0',
      price: minValue,
    });
  };

  useEffect(() => {
    handleChangeInput(borrowState.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositItems]);

  return (
    <Box flex={1}>
      <BoxCustom sx={{ flex: 1, borderRadius: isShowYourBorrow ? '16px 16px 0px 0px' : '16px' }}>
        <Typography variant="h6" alignItems="center" display="flex" gap={1} fontWeight={700} minHeight="44px" mb={3.5}>
          Mint
        </Typography>
        <Box>
          <DepositCustomInput
            readonly={isSubmitted}
            inputProps={{
              onChange: (e) => handleChangeInput(e.target.value),
              value: borrowState.value,
            }}
            selectProps={{
              value: borrowState.address,
              disabled: true,
              renderValue: () => (
                <Stack sx={{ alignItems: 'center' }}>
                  <Icon tokenName={TokenName.USDAI} sx={{ mr: 1 }} />
                  <Typography variant="body2">USDAI</Typography>
                </Stack>
              ),
            }}
            subValue={borrowState?.price}
            error={borrowState.error}
            selectOptions={[borrowState.address]}
            endAdornment={
              <Box sx={{ alignItems: 'center', gap: 1.5, height: '100%', display: 'flex' }}>
                <Typography variant="h5" sx={{ cursor: 'pointer', fontWeight: 600, color: '#FCFFD8' }} onClick={handleMax}>
                  Max
                </Typography>
              </Box>
            }
          />
        </Box>
      </BoxCustom>

      <BorrowPreview borrowItem={borrowState} isShowYourBorrow={isShowYourBorrow} mintedValueUsd={mintedValueUsd} />
    </Box>
  );
};

export default BorrowSection;
