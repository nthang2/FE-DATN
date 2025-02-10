import { Box, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';
import BorrowCustomInput from 'src/components/CustomForm/InputCustom/BorrowCustomInput';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { useBorrowState } from '../../state/hooks';
import { convertToUsd } from '../../utils';

const BorrowSection = () => {
  const { data: listPrice } = useQueryAllTokensPrice();
  const [borrowState, setBorrowState] = useBorrowState();
  const tokenInfo = findTokenInfoByToken(borrowState.address);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBorrowState({ ...borrowState, value: value, price: convertToUsd(borrowState.address, value, listPrice) });
  };

  const handleChangeSelectInput = (event: SelectChangeEvent<string>) => {
    setBorrowState({ ...borrowState, address: event.target.value });
  };

  return (
    <Box>
      <BoxCustom sx={{ flex: 1 }}>
        <Typography variant="h6" alignItems="center" display="flex" gap={1} fontWeight={700} minHeight="44px" mb={3.5}>
          Borrow
        </Typography>
        <Box>
          <BorrowCustomInput
            inputProps={{
              onChange: handleChangeInput,
              value: borrowState.value,
            }}
            selectProps={{
              onChange: handleChangeSelectInput,
              value: borrowState.address,
            }}
            subValue={borrowState.price}
          />
        </Box>
      </BoxCustom>
      <Stack bgcolor="#333331" p="16px 20px" borderRadius="0px 0px 16px 16px" alignItems="center">
        <Icon tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: 1, width: '16px', height: '16px' }} />
        <Typography variant="body1">Already borrowed ~ $6.30</Typography>
      </Stack>
    </Box>
  );
};

export default BorrowSection;
