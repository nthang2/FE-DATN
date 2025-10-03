// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { findTokenInfoByTokenEVM } from 'src/constants/tokens/evm-ecosystem/mapNameToInfoEthereum';
import { findTokenInfoByToken as findTokenInfoByTokenSOL } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useGetBalanceTokenUniversal from 'src/hooks/useQueryHook/queryBorrowUniversal/useGetBalanceTokenUniversal';
import { useCrossModeState } from 'src/states/hooks';
import { formatNumber } from 'src/utils/format';
import { useBorrowCrossSubmitState, useDepositCrossState, useSelectedNetworkDepositState } from '../../state/hooks';
import { TBorrowCrossItem } from '../../state/types';
import DepositCustomInput from '../InputCustom/DepositCustomInput';

interface IProps {
  item: TBorrowCrossItem;
  index: number;
  handleChangeInput: (index: number, value: string) => void;
  handleChangeSelectInput: (index: number, value: string) => void;
  handleRemoveItem: (index: number) => void;
  handleMax: (index: number) => void;
}

const DepositItem = (props: IProps) => {
  const { item, handleChangeInput, handleChangeSelectInput, index, handleMax, handleRemoveItem } = props;
  const [crossMode] = useCrossModeState();
  const [depositedItems] = useDepositCrossState();
  const [isSubmitted] = useBorrowCrossSubmitState();
  const [selectedNetwork, setSelectedNetwork] = useSelectedNetworkDepositState();
  const { balance } = useGetBalanceTokenUniversal(selectedNetwork, item.address);

  const displayCloseIcon = useMemo(() => {
    if (!crossMode) {
      return 'none';
    }

    return depositedItems.length === 1 ? 'none' : 'flex';
  }, [crossMode, depositedItems.length]);

  const tokenInfo = useMemo(() => {
    if (selectedNetwork === 'ethereum') {
      return findTokenInfoByTokenEVM(item.address);
    }
    return findTokenInfoByTokenSOL(item.address);
  }, [item.address, selectedNetwork]);

  return (
    <DepositCustomInput
      readonly={isSubmitted}
      inputProps={{
        onChange: (e) => {
          handleChangeInput(index, e.target.value);
        },
        value: item.value,
      }}
      handleChangeNetwork={(network) => setSelectedNetwork(network)}
      selectProps={{
        handleChangeSelect: (a: string) => handleChangeSelectInput(index, a),
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
                {formatNumber(balance, { fallback: '0', padZero: false })}
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
