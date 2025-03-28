import { Box, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { Icon, TokenName } from 'crypto-token-icon';
import { useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { LiquidatorContract } from 'src/contracts/solana/contracts/LiquidatorContract';

const UnstakeModal = () => {
  const wallet = useWallet();
  const [input, setInput] = useState('');

  const handleMax = () => {};
  const handleDeposit = async () => {
    if (!wallet) return;

    const contract = new LiquidatorContract(wallet);
    const hash = await contract.withdraw(input);
    console.log('hash', hash);
  };

  return (
    <Box
      sx={{
        '.box': {
          display: 'flex',
          py: 2,
          height: '82px',
          placeItems: 'center',
          borderRadius: '16px',
          alignItems: 'center',
          mt: 1,
          color: '#fff',
          px: 2,
        },
      }}
    >
      <Box className="flex-space-between">
        <Typography variant="body2" sx={{ fontWeight: 500, color: '#888880' }}>
          Amount
        </Typography>
        <ValueWithStatus
          status={['success']}
          value={
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              Max: 0
            </Typography>
          }
        />
      </Box>
      <Box
        className="box"
        sx={{
          bgcolor: 'background.secondary',
        }}
      >
        <Stack
          sx={{
            alignItems: 'center',
            px: 2,
            py: 2,
            mr: 2,
            border: '1px solid rgba(102, 102, 98, 1)',
            borderRadius: '8px',
            bgcolor: 'secondary.dark',
          }}
        >
          <Icon tokenName={TokenName.USDAI} sx={{ mr: 1 }} />
          <Typography variant="body2">{TokenName.USDAI}</Typography>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ py: 2 }}>
            <CustomTextField
              type="number"
              variant="filled"
              fullWidth
              focused={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.secondary', // Đổi màu nền
                },
                '& .MuiInputBase-input': {
                  bgcolor: 'background.secondary',
                  fontSize: '24px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  fontWeight: '700',
                  padding: 0,
                  mr: '12px',
                  // py: 0,
                  color: '#fff',
                  '&::placeholder': {
                    color: 'text.tertiary',
                    opacity: 0.6,
                  },
                  width: '100%',
                },
                '& .MuiFilledInput-root': {
                  backgroundColor: 'background.secondary',
                  '&:before, &:after': {
                    display: 'none',
                  },
                },
                '& .MuiFilledInput-root.Mui-focused': {
                  backgroundColor: 'background.secondary',
                },
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              helperText={undefined}
            />
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              {/* {formatNumber(valueInUSD, { fractionDigits: 2, suffix: '$' })} */}0
            </Typography>
          </Box>
        </Box>
        <Box sx={{ alignItems: 'center', gap: 1.5, height: '100%', display: 'flex' }}>
          <Typography variant="h5" sx={{ cursor: 'pointer', fontWeight: 600, color: '#FCFFD8' }} onClick={handleMax}>
            Max
          </Typography>
        </Box>
      </Box>

      <ButtonLoading sx={{ mt: 4 }} variant="contained" loading={false} fullWidth onClick={handleDeposit}>
        Confirm
      </ButtonLoading>
    </Box>
  );
};

export default UnstakeModal;
