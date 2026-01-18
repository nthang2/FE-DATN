import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import { findTokenInfoByToken, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useInvestedValue from 'src/hooks/useQueryHook/queryBorrow/useInvestedValue';
import useMyPortfolio from 'src/hooks/useQueryHook/queryMyPortfolio/useMyPortfolio';
import { TokenName } from 'src/libs/crypto-icons';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { useCrossModeState } from 'src/states/hooks';
import { regexConfigValue } from 'src/utils';
import { decimalFlood } from 'src/utils/format';
import { useBorrowState, useBorrowSubmitState, useDepositState } from '../../state/hooks';
import { convertToAmountToken, convertToUsd, validateBorrowItem } from '../../utils';
import DepositCustomInput from '../InputCustom/DepositCustomInput';
import BorrowPreview from './BorrowPreview';

const BorrowSection = () => {
  const { data: listPrice } = useQueryAllTokensPrice();
  const [borrowState, setBorrowState] = useBorrowState();
  const [isSubmitted] = useBorrowSubmitState();
  const [depositItems] = useDepositState();
  const [crossMode] = useCrossModeState();
  const { totalDepositValue, yourBorrowByAddress, maxLtv } = useInvestedValue();
  const { asset } = useMyPortfolio();

  const mintedValueUsd = useMemo(() => {
    if (!asset) return 0;
    const currAdd = depositItems[0].address;

    if (crossMode) {
      const usdAiInfo = mapNameToInfoSolana[TokenName.USDAI];
      const mintedValueCrossMode = asset[usdAiInfo.address];
      return Number(mintedValueCrossMode?.usdaiToRedeem);
    }

    return Number(asset[currAdd]?.usdaiToRedeem);
  }, [asset, crossMode, depositItems]);
  const isShowYourBorrow = !!mintedValueUsd && Number(mintedValueUsd) > 0;

  const handleChangeInput = (value: string) => {
    const price = convertToUsd(borrowState.address, decimalFlood(value, 6), listPrice);
    const borrowPercent = ((price + yourBorrowByAddress) / totalDepositValue) * 100;
    const error = validateBorrowItem(Number(value), borrowPercent, maxLtv);
    const inputValue = regexConfigValue(decimalFlood(value, 6));

    setBorrowState({
      ...borrowState,
      value: inputValue,
      price: price,
      error: error,
    });
  };

  const handleMax = () => {
    if (isSubmitted) return;
    const borrowPrice = (Number(maxLtv) / 100) * totalDepositValue - yourBorrowByAddress;
    const selectedToken = findTokenInfoByToken(borrowState.address);
    const minValue = borrowPrice < 0 ? 0 : borrowPrice;
    const borrowAmount = convertToAmountToken(borrowState.address, minValue.toString(), listPrice);
    const decimals = selectedToken?.decimals || 6;

    setBorrowState({
      ...borrowState,
      value: borrowAmount ? decimalFlood(borrowAmount, decimals) : '0',
      price: minValue,
      error: undefined,
    });
  };

  useEffect(() => {
    handleChangeInput(borrowState.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositItems]);

  return (
    <Box flex={1}>
      <BoxCustom sx={{ flex: 1, borderRadius: isShowYourBorrow ? '16px 16px 0px 0px' : '16px', minHeight: '225px' }}>
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
                  <IconToken tokenName={TokenName.USDAI} sx={{ mr: 1 }} />
                  <Typography variant="body2">USDAI</Typography>
                </Stack>
              ),
            }}
            subValue={borrowState?.price}
            error={borrowState.error}
            selectOptions={[borrowState.address]}
            hideDropdownIcon={true}
            endAdornment={
              <Box sx={{ alignItems: 'center', gap: 1.5, height: '100%', display: 'flex' }}>
                <Typography variant="h5" sx={{ cursor: 'pointer', fontWeight: 600, color: '#FFD8F0' }} onClick={handleMax}>
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
