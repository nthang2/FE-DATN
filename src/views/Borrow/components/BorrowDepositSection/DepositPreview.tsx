import { Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import React, { useMemo } from 'react';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TBorrowItem } from '../../state/types';

interface IProps {
  isHasDeposited: boolean;
  depositedValueUsd: number;
  depositItems: TBorrowItem[];
}

const DepositPreview = (props: IProps) => {
  const { isHasDeposited, depositItems, depositedValueUsd } = props;
  const totalNewDeposit = depositItems.reduce((total, curr) => total + Number(curr.price), 0);
  const totalDepositedValue = useMemo(() => {
    return totalNewDeposit + depositedValueUsd;
  }, [depositedValueUsd, totalNewDeposit]);
  const isHasNewValue = Number(totalNewDeposit) > 0;

  return (
    isHasDeposited && (
      <Stack bgcolor="#333331" p="16px 20px" borderRadius="0px 0px 16px 16px" alignItems="left" direction="column" gap={1}>
        <Stack alignItems="center">
          {depositItems.map((item, index) => {
            const tokenInfo = findTokenInfoByToken(item.address);
            return <Icon key={index} tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: '1px', width: '16px', height: '16px' }} />;
          })}
          <Typography ml={1} variant="body1">
            Your deposited ~ ${depositedValueUsd?.toFixed(4)}
          </Typography>
        </Stack>
        <Stack alignItems="center" display={isHasNewValue ? 'flex' : 'none'}>
          {depositItems.map((item, index) => {
            const tokenInfo = findTokenInfoByToken(item.address);
            return <Icon key={index} tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: '1px', width: '16px', height: '16px' }} />;
          })}
          <Typography ml={1} variant="body1">
            Preview new total ~ ${totalDepositedValue?.toFixed(4)}
          </Typography>
        </Stack>
      </Stack>
    )
  );
};

export default DepositPreview;
