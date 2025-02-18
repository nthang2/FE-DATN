import { Box, Button, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { useMemo } from 'react';
import { PlusIcon } from 'src/assets/icons';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import { findTokenInfoByToken, listTokenAvailable, TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import { useSolanaBalanceTokens } from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { roundNumber } from 'src/utils/format';
import { defaultBorrowValue } from '../../constant';
import { useBorrowSubmitState, useDepositState } from '../../state/hooks';
import { convertToUsd, validateDepositItem } from '../../utils';
import DepositItem from './DepositItem';

const DepositSection = () => {
  const [depositItems, setDepositState] = useDepositState();
  const [isSubmitted] = useBorrowSubmitState();
  const { data: listPrice } = useQueryAllTokensPrice();
  const { data: depositedValue } = useQueryDepositValue();
  const { address } = useSummarySolanaConnect();
  const balance = useSolanaBalanceTokens(address, Object.keys(listTokenAvailable) as Array<TSolanaToken>);

  const totalDepositedValue = useMemo(() => {
    if (!depositedValue || !listPrice) return 0;
    const depositAddress = depositItems[0].address;
    const result = convertToUsd(depositAddress, depositedValue[depositAddress], listPrice);

    return Number(result);
  }, [depositItems, depositedValue, listPrice]);
  const isHasDeposited = Boolean(totalDepositedValue) || totalDepositedValue > 0;
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

    setDepositState(cloneArr);
  };

  const handleChangeInput = (index: number, value: string) => {
    const cloneArr = depositItems.map((item, arrIndex) => {
      if (arrIndex === index) {
        return {
          ...item,
          value: value,
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

      {isHasDeposited && (
        <Stack bgcolor="#333331" p="16px 20px" borderRadius="0px 0px 16px 16px" alignItems="center">
          <Stack>
            {Object.keys(depositedValue || {})
              .slice(0, 2)
              .map((item, index) => {
                const tokenInfo = findTokenInfoByToken(item);
                return <Icon key={index} tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: '1px', width: '16px', height: '16px' }} />;
              })}
          </Stack>

          <Typography ml={1} variant="body1">
            Your deposited ~ ${totalDepositedValue.toFixed(2)}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default DepositSection;
