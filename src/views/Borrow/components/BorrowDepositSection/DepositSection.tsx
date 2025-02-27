import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { PlusIcon } from 'src/assets/icons';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import { listTokenAvailable, TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import { useSolanaBalanceTokens } from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { roundNumber } from 'src/utils/format';
import { defaultBorrowValue } from '../../constant';
import { useBorrowSubmitState, useDepositState } from '../../state/hooks';
import { convertToUsd, validateDepositItem } from '../../utils';
import DepositItem from './DepositItem';
import DepositPreview from './DepositPreview';
import { useSearchParams } from 'react-router-dom';
import { regexConfigValue } from 'src/utils';

const DepositSection = () => {
  const [depositItems, setDepositState] = useDepositState();
  const [isSubmitted] = useBorrowSubmitState();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: listPrice } = useQueryAllTokensPrice();
  const { data: depositedValue } = useQueryDepositValue();
  const { address } = useSummarySolanaConnect();
  const balance = useSolanaBalanceTokens(address, Object.keys(listTokenAvailable) as Array<TSolanaToken>);

  const depositedValueUsd = useMemo(() => {
    if (!depositedValue || !listPrice) return 0;
    const depositAddress = depositItems[0].address;
    const result = convertToUsd(depositAddress, depositedValue[depositAddress], listPrice);

    return Number(result);
  }, [depositItems, depositedValue, listPrice]);
  const isHasDeposited = Boolean(depositedValueUsd) || depositedValueUsd > 0;
  const depositItemBalance = useMemo(() => {
    return balance.find((item) => item.address === depositItems[0].address)?.balance.toNumber();
  }, [balance, depositItems]);

  const handleRemoveItem = (index: number) => {
    if (depositItems.length === 1) return;
    const newArr = [...depositItems];
    newArr.splice(index, 1);

    setDepositState(newArr);
  };

  const handleAddItem = () => {
    if (depositItems.length < 6) {
      setDepositState((prev) => [...prev, defaultBorrowValue]);
    }
  };

  const handleChangeSelectInput = (index: number, value: string) => {
    const newBalance = balance.find((item) => item.address === value)?.balance.toFixed(4);
    const cloneArr = depositItems.map((item, arrIndex) => {
      if (arrIndex === index) {
        return {
          ...item,
          address: value,
          price: convertToUsd(value, item.value, listPrice),
          error: validateDepositItem(Number(item.value), Number(newBalance)),
        };
      }

      return item;
    });

    searchParams.set('deposit', cloneArr[0].address);
    setSearchParams(searchParams);
    setDepositState(cloneArr);
  };

  const handleChangeInput = (index: number, value: string) => {
    const inputValue = regexConfigValue(value);
    const cloneArr = depositItems.map((item, arrIndex) => {
      if (arrIndex === index) {
        return {
          ...item,
          value: inputValue,
          price: convertToUsd(item.address, value, listPrice),
          error: validateDepositItem(Number(value), Number(depositItemBalance)),
        };
      }

      return item;
    });

    setDepositState(cloneArr);
  };

  const handleMax = (index: number) => {
    const cloneArr = depositItems.map((item, arrIndex) => {
      if (arrIndex === index) {
        return {
          ...item,
          value: depositItemBalance?.toString() || '0',
          price: convertToUsd(item.address, depositItemBalance?.toString() || '0', listPrice),
          error: validateDepositItem(Number(depositItemBalance), Number(depositItemBalance)),
        };
      }

      return item;
    });

    setDepositState(cloneArr);
  };

  useEffect(() => {
    const depositParams = searchParams.get('deposit');
    if (!depositParams) return;
    if (depositParams === depositItems[0].address) return;
    handleChangeSelectInput(0, depositParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Box flex={1}>
      <BoxCustom sx={{ flex: 1, borderRadius: isHasDeposited ? '16px 16px 0px 0px' : '16px' }}>
        <Stack justifyContent="space-between" width="100%" mb={'14px'}>
          <Typography variant="h6" alignItems="center" display="flex" gap={1} fontWeight={700}>
            Deposit
            <TooltipInfo title="Deposit collateral to mint USDAI" />
          </Typography>

          <Button
            variant="text"
            sx={{
              color: 'text.secondary',
              ':hover': {
                color: '#000',
                '& path': {
                  fill: '#000',
                },
              },
              display: 'none',
            }}
            disabled={isSubmitted || depositItems.length >= 6}
            onClick={handleAddItem}
          >
            <Typography variant="body2" alignItems="center" display="flex" gap={1} fontWeight={700}>
              <span>
                <PlusIcon />
              </span>
              Add more
            </Typography>
          </Button>
        </Stack>

        <Typography variant="body2" mb={0.5}>
          Your Balance: {roundNumber(depositItemBalance || 0, 4)}
        </Typography>

        <Box>
          {depositItems.map((item, index) => {
            return (
              <DepositItem
                item={item}
                index={index}
                key={index}
                handleChangeInput={handleChangeInput}
                handleChangeSelectInput={handleChangeSelectInput}
                handleRemoveItem={handleRemoveItem}
                handleMax={handleMax}
              />
            );
          })}
        </Box>
      </BoxCustom>

      <DepositPreview depositItem={depositItems[0]} depositedValueUsd={depositedValueUsd} isHasDeposited={isHasDeposited} />
    </Box>
  );
};

export default DepositSection;
