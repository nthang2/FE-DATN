import { Box, Button, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { PlusIcon } from 'src/assets/icons';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { defaultBorrowValue } from '../../constant';
import { useBorrowSubmitState, useDepositState } from '../../state/hooks';
import { convertToUsd, validateDepositItem } from '../../utils';
import DepositItem from './DepositItem';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import { useMemo } from 'react';

const DepositSection = () => {
  const [depositItems, setDepositState] = useDepositState();
  const [isSubmitted] = useBorrowSubmitState();
  const { data: listPrice } = useQueryAllTokensPrice();
  const { data: depositedValue } = useQueryDepositValue();

  const totalDepositedValue = useMemo(() => {
    if (!depositedValue || !listPrice) return 0;
    const result = Object.keys(depositedValue).reduce((total, key) => {
      if (listPrice[key]) {
        return convertToUsd(key, depositedValue[key], listPrice);
      }

      return total;
    }, 0);

    return result;
  }, [depositedValue, listPrice]);
  const isHasDeposited = Boolean(totalDepositedValue) || totalDepositedValue > 0;

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
    const cloneArr = depositItems.map((item, arrIndex) => {
      if (arrIndex === index) {
        return { ...item, address: value };
      }

      return item;
    });

    setDepositState(cloneArr);
  };

  const handleChangeInput = (index: number, value: string) => {
    const cloneArr = depositItems.map((item, arrIndex) => {
      if (arrIndex === index) {
        return { ...item, value: value, price: convertToUsd(item.address, value, listPrice), error: validateDepositItem(Number(value)) };
      }

      return item;
    });

    setDepositState(cloneArr);
  };

  return (
    <Box>
      <BoxCustom sx={{ flex: 1, borderRadius: isHasDeposited ? '16px 16px 0px 0px' : '16px' }}>
        <Stack justifyContent="space-between" width="100%" mb={3.5}>
          <Typography variant="h6" alignItems="center" display="flex" gap={1} fontWeight={700}>
            Deposit
            <TooltipInfo title="info" />
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
            Already deposited ~ ${totalDepositedValue.toFixed(2)}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default DepositSection;
