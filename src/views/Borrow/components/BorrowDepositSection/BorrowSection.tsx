import { Box, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useMaxLtv from '../../hooks/useMaxLtv';
import { useBorrowState, useBorrowSubmitState, useDepositState } from '../../state/hooks';
import { convertToUsd, validateBorrowItem } from '../../utils';
import DepositCustomInput from '../InputCustom/DepositCustomInput';
import { useMemo } from 'react';

const BorrowSection = () => {
  const { data: listPrice } = useQueryAllTokensPrice();
  const [borrowState, setBorrowState] = useBorrowState();
  const [isSubmitted] = useBorrowSubmitState();
  const { maxLtv } = useMaxLtv();
  const [depositItems] = useDepositState();

  const tokenInfo = findTokenInfoByToken(borrowState.address);
  const totalDepositValue = useMemo(() => depositItems.reduce((total, item) => total + item.price, 0), [depositItems]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const price = convertToUsd(borrowState.address, value, listPrice);
    const borrowPercent = (price / totalDepositValue) * 100;
    const error = validateBorrowItem(Number(value), borrowPercent, maxLtv);

    setBorrowState({
      ...borrowState,
      value: value,
      price: price,
      error: error,
    });
  };

  return (
    <Box>
      <BoxCustom sx={{ flex: 1, borderRadius: '16px 16px 0px 0px' }}>
        <Typography variant="h6" alignItems="center" display="flex" gap={1} fontWeight={700} minHeight="44px" mb={3.5}>
          Borrow
        </Typography>
        <Box>
          <DepositCustomInput
            readonly={isSubmitted}
            inputProps={{
              onChange: handleChangeInput,
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
            subValue={borrowState.price}
            error={borrowState.error}
          />
        </Box>
      </BoxCustom>
      <Stack bgcolor="#333331" p="16px 20px" borderRadius="0px 0px 16px 16px" alignItems="center">
        <Icon tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: 1, width: '16px', height: '16px' }} />
        <Typography variant="body1">Already borrowed ~ $6.30</Typography>
      </Stack>
    </Box>
  );
};

export default BorrowSection;
