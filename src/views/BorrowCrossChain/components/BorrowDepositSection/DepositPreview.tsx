import { Collapse, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { findTokenInfoByToken, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TBorrowItem } from '../../state/types';
import useMyPortfolio from 'src/hooks/useQueryHook/queryMyPortfolio/useMyPortfolio';
import { useCrossModeState } from 'src/states/hooks';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { TokenName } from 'src/libs/crypto-icons';
interface IProps {
  isHasDeposited: boolean;
  depositedValueUsd: number;
  depositItems: TBorrowItem[];
}

const DepositPreview = (props: IProps) => {
  const { isHasDeposited, depositItems, depositedValueUsd } = props;
  const { asset } = useMyPortfolio();
  const [crossMode] = useCrossModeState();

  const totalNewDeposit = depositItems.reduce((total, curr) => total + Number(curr.price), 0);
  const totalDepositedValue = useMemo(() => {
    return totalNewDeposit + depositedValueUsd;
  }, [depositedValueUsd, totalNewDeposit]);
  const isHasNewValue = Number(totalNewDeposit) > 0;

  const depositedToken = useMemo(() => {
    if (crossMode && asset) {
      const depositedList = Object.values(asset)
        .filter((item) => item.depositedUSD > 0)
        .map((item) => {
          const key = item.name as keyof typeof mapNameToInfoSolana;
          return mapNameToInfoSolana[key];
        });

      return depositedList;
    }

    return depositItems;
  }, [asset, crossMode, depositItems]);

  const previewNewDepositTokens = useMemo(() => {
    if (crossMode && asset) {
      const list = depositItems
        .filter((item) => Number(item.value) > 0 && !depositedToken.find((token) => token.address === item.address))
        .map((item) => {
          return findTokenInfoByToken(item.address) || item;
        });

      return [...depositedToken, ...list];
    }

    return depositItems;
  }, [asset, crossMode, depositItems, depositedToken]);

  return (
    <Collapse in={isHasDeposited}>
      <Stack bgcolor="#333331" p="16px 20px" borderRadius="0px 0px 16px 16px" alignItems="left" direction="column" gap={1}>
        <Stack alignItems="center">
          {depositedToken.map((item, index) => {
            const tokenInfo = findTokenInfoByToken(item?.address);
            return <IconToken key={index} tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: '1px', width: '16px', height: '16px' }} />;
          })}
          <Typography ml={1} variant="body1">
            Your deposited ~ ${depositedValueUsd?.toFixed(4)}
          </Typography>
        </Stack>
        <Stack alignItems="center" display={isHasNewValue ? 'flex' : 'none'}>
          {previewNewDepositTokens.map((item, index) => {
            const tokenInfo = findTokenInfoByToken(item?.address);
            return <IconToken key={index} tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: '1px', width: '16px', height: '16px' }} />;
          })}
          <Typography ml={1} variant="body1">
            Preview new total ~ ${totalDepositedValue?.toFixed(4)}
          </Typography>
        </Stack>
      </Stack>
    </Collapse>
  );
};

export default DepositPreview;
