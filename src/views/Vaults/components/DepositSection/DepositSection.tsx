import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import CustomSlider from '../CustomSlider/Slider';
import { Icon, TokenName } from 'crypto-token-icon';

const DepositSection = () => {
  return (
    <Box>
      <Stack justifyContent="space-between" mb={0.5}>
        <Typography>Amount</Typography>
        <Typography>Max: 0.00</Typography>
      </Stack>

      <TextField
        fullWidth
        variant="filled"
        type="number"
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <Stack alignItems="center" gap={0.5}>
              <Icon tokenName={TokenName.USDAI} />
              <Typography variant="body1" sx={{ color: 'primary.main', pr: 2 }}>
                USDAI
              </Typography>
            </Stack>
          ),
          sx: { padding: 2, fontSize: '24px', height: 'unset' },
        }}
        inputProps={{ style: { padding: 0 } }}
        sx={{ borderRadius: '16px' }}
      />

      <CustomSlider sx={{ mt: 2.5 }} />

      <Button variant="contained" sx={{ mt: 2.5 }} fullWidth>
        Deposit
      </Button>
    </Box>
  );
};

export default DepositSection;
