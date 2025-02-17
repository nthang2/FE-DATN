import { Box, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { useEffect, useMemo } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryYourBorrow from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryYourBorrow';
import { useBorrowState, useBorrowSubmitState, useDepositState } from '../../state/hooks';
import { convertToUsd, validateBorrowItem } from '../../utils';
import DepositCustomInput from '../InputCustom/DepositCustomInput';

const BorrowSection = () => {
  const { data: listPrice } = useQueryAllTokensPrice();
  const [borrowState, setBorrowState] = useBorrowState();
  const [isSubmitted] = useBorrowSubmitState();
  const { data: yourBorrow } = useQueryYourBorrow();
  const [depositItems] = useDepositState();

  const tokenInfo = findTokenInfoByToken(borrowState.address);
  const totalDepositValue = useMemo(() => depositItems.reduce((total, item) => total + item?.price, 0), [depositItems]);
  const totalYourBorrow = useMemo(() => {
    if (!yourBorrow) return 0;
    const currAdd = depositItems[0].address;

    return Number(yourBorrow[currAdd]);
  }, [depositItems, yourBorrow]);
  const maxLtv = useMemo(() => {
    if (depositItems[0]) {
      const tokenInfo = findTokenInfoByToken(depositItems[0].address);
      return Number(tokenInfo?.ratio) * 100;
    }

    return 30;
  }, [depositItems]);
  const isShowYourBorrow = !!totalYourBorrow && Number(totalYourBorrow) > 0;

  const handleChangeInput = (value: string) => {
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

  useEffect(() => {
    handleChangeInput(borrowState.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositItems]);

  return (
    <Box>
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
          />
        </Box>
      </BoxCustom>

      {isShowYourBorrow && (
        <Stack bgcolor="#333331" p="16px 20px" borderRadius="0px 0px 16px 16px" alignItems="center">
          <Icon tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: 1, width: '16px', height: '16px' }} />
          <Typography variant="body1">Already minted ~ ${totalYourBorrow}</Typography>
        </Stack>
      )}
    </Box>
  );
};

export default BorrowSection;
