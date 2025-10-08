import { Box, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import { findTokenInfoByToken, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPriceUniversal from 'src/hooks/useQueryAllTokensPriceUniversal';
import useInvestedValueUniversal from 'src/hooks/useQueryHook/queryBorrowUniversal/useInvestedValueUniversal';
import useMyPortfolioUniversal from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useMyPortfolioUniversal';
import { TokenName } from 'src/libs/crypto-icons';
import { useCrossModeState } from 'src/states/hooks';
import { regexConfigValue } from 'src/utils';
import { decimalFlood } from 'src/utils/format';
import { useBorrowCrossState, useBorrowCrossSubmitState, useDepositCrossState, useSelectedNetworkBorrowState } from '../../state/hooks';
import { convertToAmountToken, convertToUsd, validateBorrowItem } from '../../utils';
import DepositCustomInput from '../InputCustom/DepositCustomInput';
import BorrowPreview from './BorrowPreview';

const BorrowSection = () => {
  const { data: listPrice } = useQueryAllTokensPriceUniversal();
  const [borrowState, setBorrowState] = useBorrowCrossState();
  const [isSubmitted] = useBorrowCrossSubmitState();
  const [depositItems] = useDepositCrossState();
  const [crossMode] = useCrossModeState();
  const [borrowNetwork, setSelectedNetwork] = useSelectedNetworkBorrowState();
  const { totalDepositValue, yourBorrowByAddress, maxLtv } = useInvestedValueUniversal();
  const { asset } = useMyPortfolioUniversal();

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
    const price = convertToUsd(borrowState.address, decimalFlood(value, 6), borrowNetwork, listPrice);
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
    // const maxValue = asset?.[borrowState.address]?.maxAvailableToMint || 0;

    const borrowPrice = (Number(maxLtv) / 100) * totalDepositValue - yourBorrowByAddress;
    const selectedToken = findTokenInfoByToken(borrowState.address);
    const minValue = borrowPrice < 0 ? 0 : borrowPrice;
    const decimals = selectedToken?.decimals || 6;
    const borrowAmount = convertToAmountToken(borrowState.address, minValue.toString(), borrowNetwork, listPrice);
    // const borrowPrice = convertToUsd(borrowState.address, maxValue.toString(), borrowNetwork, listPrice);
    // const borrowAmount = maxValue;

    setBorrowState({
      ...borrowState,
      value: borrowAmount ? decimalFlood(borrowAmount, decimals) : '0',
      price: minValue,
      error: undefined,
    });
  };

  const handleChangeSelectInput = (value: string) => {
    // const newBalance = balance.find((item) => item.address === value)?.balance.toFixed(4);
    const cloneArr = {
      value: '0',
      address: value,
      price: 0,
      error: undefined,
      network: borrowNetwork,
    };

    setBorrowState(cloneArr);
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
            handleChangeNetwork={(network) => setSelectedNetwork(network)}
            inputProps={{
              onChange: (e) => handleChangeInput(e.target.value),
              value: borrowState.value,
            }}
            selectProps={{
              value: borrowState.address,
              disabled: true,
              handleChangeSelect: (a: string) => {
                handleChangeSelectInput(a);
              },
            }}
            subValue={borrowState?.price}
            error={borrowState.error}
            selectOptions={[borrowState.address]}
            hideDropdownIcon={true}
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
