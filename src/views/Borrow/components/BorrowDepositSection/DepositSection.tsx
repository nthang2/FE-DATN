import { Box, Button, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PlusIcon } from 'src/assets/icons';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import { listTokenAvailable, TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useMyPortfolio from 'src/hooks/useQueryHook/queryMyPortfolio/useMyPortfolio';
import { useCrossModeState } from 'src/states/hooks';
import { useSolanaBalanceTokens } from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { regexConfigValue } from 'src/utils';
import { defaultBorrowValue } from '../../constant';
import { useBorrowSubmitState, useDepositState } from '../../state/hooks';
import { convertToUsd, validateDepositItem } from '../../utils';
import DepositItem from './DepositItem';
import DepositPreview from './DepositPreview';
import CrossModeSwitch from 'src/components/CrossModeSwitch/CrossModeSwitch';

const DepositSection = () => {
  const [depositItems, setDepositState] = useDepositState();
  const [isSubmitted] = useBorrowSubmitState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [crossMode] = useCrossModeState();
  const { data: listPrice } = useQueryAllTokensPrice();
  const { asset } = useMyPortfolio();
  const { address } = useSummarySolanaConnect();
  const balance = useSolanaBalanceTokens(address, Object.keys(listTokenAvailable) as Array<TSolanaToken>);

  const depositedValueUsd = useMemo(() => {
    if (!asset || !listPrice) return 0;
    const depositAddress = depositItems[0].address;
    if (crossMode) {
      return Object.values(asset).reduce((total, item) => total + item.depositedUSD, 0);
    }

    return asset?.[depositAddress]?.depositedUSD;
  }, [asset, crossMode, depositItems, listPrice]);

  const isAddAllOptions = depositItems.length < Object.keys(listTokenAvailable).length;

  const isHasDeposited = crossMode || Boolean(depositedValueUsd) || depositedValueUsd > 0;

  const depositItemBalance = useCallback(
    (index: number) => {
      return balance.find((item) => item.address === depositItems[index].address)?.balance.toNumber();
    },
    [balance, depositItems]
  );

  const handleRemoveItem = (index: number) => {
    if (depositItems.length === 1) return;
    const newArr = [...depositItems];
    newArr.splice(index, 1);

    setDepositState(newArr);
  };

  const handleAddItem = () => {
    if (isAddAllOptions) {
      const listTokenRemain = Object.values(listTokenAvailable).filter((item) => {
        const isHasChoose = depositItems.every((deposit) => deposit.address !== item.address);
        return isHasChoose;
      });

      setDepositState((prev) => [...prev, { ...defaultBorrowValue, address: listTokenRemain[0]?.address }]);
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
          error: validateDepositItem(Number(value), Number(depositItemBalance(index))),
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
          value: depositItemBalance(index)?.toString() || '0',
          price: convertToUsd(item.address, depositItemBalance(index)?.toString() || '0', listPrice),
          error: undefined,
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
        <Stack justifyContent="space-between" width="100%" mb={'36px'}>
          <Typography variant="h6" alignItems="center" display="flex" gap={1} fontWeight={700}>
            Deposit
            <TooltipInfo title="Deposit collateral to mint USDAI" />
          </Typography>

          <CrossModeSwitch />
        </Stack>

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

        <Button
          variant="text"
          fullWidth
          sx={{
            color: '#fff',
            display: crossMode ? 'flex' : 'none',
            '& path': {
              fill: '#fff',
            },
            ':hover': {
              '& path': {
                fill: '#000',
              },
            },
            textAlign: 'start',
            justifyContent: 'flex-start',
          }}
          disabled={isSubmitted || !isAddAllOptions}
          onClick={handleAddItem}
        >
          <Typography variant="body2" alignItems="center" display="flex" gap={1} fontWeight={700}>
            <span>
              <PlusIcon />
            </span>
            Add more collateral
          </Typography>
        </Button>
      </BoxCustom>

      <DepositPreview depositItems={depositItems} depositedValueUsd={depositedValueUsd} isHasDeposited={isHasDeposited} />
    </Box>
  );
};

export default DepositSection;
