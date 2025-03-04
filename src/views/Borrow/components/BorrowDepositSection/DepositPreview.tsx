import { Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import React, { useMemo } from 'react';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TBorrowItem } from '../../state/types';

interface IProps {
  isHasDeposited: boolean;
  depositedValueUsd: number;
  depositItem: TBorrowItem;
}

const DepositPreview = (props: IProps) => {
  const { isHasDeposited, depositItem, depositedValueUsd } = props;
  const totalDepositedValue = useMemo(() => {
    return depositItem.price + depositedValueUsd;
  }, [depositItem, depositedValueUsd]);
  const isHasNewValue = Number(depositItem.value) > 0;

  return (
    isHasDeposited && (
      <Stack bgcolor="#333331" p="16px 20px" borderRadius="0px 0px 16px 16px" alignItems="left" direction="column" gap={1}>
        <Stack alignItems="center">
          <Icon
            tokenName={findTokenInfoByToken(depositItem.address)?.symbol as TokenName}
            sx={{ mr: '1px', width: '16px', height: '16px' }}
          />
          <Typography ml={1} variant="body1">
            Your deposited ~ ${depositedValueUsd.toFixed(4)}
          </Typography>
        </Stack>

        <Stack alignItems="center" display={isHasNewValue ? 'flex' : 'none'}>
          <Icon
            tokenName={findTokenInfoByToken(depositItem.address)?.symbol as TokenName}
            sx={{ mr: '1px', width: '16px', height: '16px' }}
          />
          <Typography ml={1} variant="body1">
            Preview new total ~ ${totalDepositedValue.toFixed(4)}
          </Typography>
        </Stack>
      </Stack>
    )
  );
};

export default DepositPreview;
