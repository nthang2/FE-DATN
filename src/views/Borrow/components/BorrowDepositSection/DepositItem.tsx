// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import { IconButton } from '@mui/material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useBorrowSubmitState, useDepositState } from '../../state/hooks';
import { TBorrowItem } from '../../state/types';
import DepositCustomInput from '../InputCustom/DepositCustomInput';
import CloseIcon from '@mui/icons-material/Close';
import { useMemo } from 'react';
import { useCrossModeState } from 'src/states/hooks';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { findTokenInfoByToken, TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';

interface IProps {
  item: TBorrowItem;
  index: number;
  handleChangeInput: (index: number, value: string) => void;
  handleChangeSelectInput: (index: number, value: string) => void;
  handleRemoveItem: (index: number) => void;
  handleMax: (index: number) => void;
}

const DepositItem = (props: IProps) => {
  const { item, handleChangeInput, handleChangeSelectInput, index, handleMax, handleRemoveItem } = props;
  const [crossMode] = useCrossModeState();
  const [depositedItems] = useDepositState();
  const [isSubmitted] = useBorrowSubmitState();
  const tokenInfo = findTokenInfoByToken(item.address);
  const { address } = useSummarySolanaConnect();
  const { balance } = useSolanaBalanceToken(address, tokenInfo?.symbol as TSolanaToken);

  const displayCloseIcon = useMemo(() => {
    if (!crossMode) {
      return 'none';
    }

    return depositedItems.length === 1 ? 'none' : 'flex';
  }, [crossMode, depositedItems.length]);

  return (
    <DepositCustomInput
      readonly={isSubmitted}
      inputProps={{
        onChange: (e) => {
          handleChangeInput(index, e.target.value);
        },
        value: item.value,
      }}
      selectProps={{
        onChange: (e) => handleChangeSelectInput(index, e.target.value),
        value: item.address,
      }}
      key={index}
      endAdornment={
        <Box sx={{ alignItems: 'center', gap: 0.5, height: '100%', display: 'flex' }}>
          <Box>
            <Typography
              variant="h5"
              sx={{ cursor: 'pointer', fontWeight: 600, color: '#FCFFD8', textAlign: 'end' }}
              onClick={() => handleMax(index)}
            >
              Max
            </Typography>

            <Stack gap={0.25} mt={0.5}>
              <Typography color="secondary" variant="caption2">
                {balance.toFixed(2)}
              </Typography>
              <Typography color="secondary" variant="caption2">
                {tokenInfo?.symbol}
              </Typography>
            </Stack>
          </Box>
          <IconButton
            sx={{
              display: displayCloseIcon,
            }}
            onClick={() => handleRemoveItem(index)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      }
      subValue={item?.price}
      error={item.error}
    />
  );
};

export default DepositItem;
