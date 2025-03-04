import { Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import React, { useMemo } from 'react';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TBorrowItem } from '../../state/types';

interface IProps {
  isShowYourBorrow: boolean;
  mintedValueUsd: number;
  borrowItem: TBorrowItem;
}

const BorrowPreview = (props: IProps) => {
  const { isShowYourBorrow, borrowItem, mintedValueUsd } = props;
  const totalBorrowValue = useMemo(() => {
    return borrowItem.price + mintedValueUsd;
  }, [borrowItem, mintedValueUsd]);
  const isHasNewValue = Number(borrowItem.value) > 0;

  return (
    isShowYourBorrow && (
      <Stack bgcolor="#333331" p="16px 20px" borderRadius="0px 0px 16px 16px" alignItems="left" direction="column" gap={1}>
        <Stack alignItems="center">
          <Icon
            tokenName={findTokenInfoByToken(borrowItem.address)?.symbol as TokenName}
            sx={{ mr: '1px', width: '16px', height: '16px' }}
          />
          <Typography ml={1} variant="body1">
            Already minted ~ ${mintedValueUsd.toFixed(4)}
          </Typography>
        </Stack>

        <Stack alignItems="center" display={isHasNewValue ? 'flex' : 'none'}>
          <Icon
            tokenName={findTokenInfoByToken(borrowItem.address)?.symbol as TokenName}
            sx={{ mr: '1px', width: '16px', height: '16px' }}
          />
          <Typography ml={1} variant="body1">
            Preview new total ~ ${totalBorrowValue.toFixed(4)}
          </Typography>
        </Stack>
      </Stack>
    )
  );
};

export default BorrowPreview;
