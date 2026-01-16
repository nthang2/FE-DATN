import { Collapse, Stack, Typography } from '@mui/material';
import { TokenName } from 'src/libs/crypto-icons';
import { useMemo } from 'react';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { TBorrowItem } from 'src/views/Borrow/state/types';

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
    <Collapse in={isShowYourBorrow}>
      {
        <Stack bgcolor="#333331" p="16px 20px" borderRadius="0px 0px 16px 16px" alignItems="left" direction="column" gap={1}>
          <Stack alignItems="center">
            <IconToken
              tokenName={findTokenInfoByToken(borrowItem.address)?.symbol as TokenName}
              sx={{ mr: '1px', width: '16px', height: '16px' }}
            />
            <Typography ml={1} variant="body1">
              Already minted ~ ${mintedValueUsd.toFixed(0)}
            </Typography>
          </Stack>

          <Stack alignItems="center" display={isHasNewValue ? 'flex' : 'none'}>
            <IconToken
              tokenName={findTokenInfoByToken(borrowItem.address)?.symbol as TokenName}
              sx={{ mr: '1px', width: '16px', height: '16px' }}
            />
            <Typography ml={1} variant="body1">
              Preview new total ~ ${totalBorrowValue.toFixed(4)}
            </Typography>
          </Stack>
        </Stack>
      }
    </Collapse>
  );
};

export default BorrowPreview;
