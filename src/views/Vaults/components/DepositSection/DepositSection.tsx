import { Box, Button, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import CustomSlider from '../CustomSlider/Slider';
import { useState } from 'react';

const DepositSection = () => {
  const [inputValue, setInputValue] = useState(0);

  return (
    <Box>
      <Stack justifyContent="space-between" mb={0.5}>
        <Typography>Amount</Typography>
        <Typography>Max: 0.00</Typography>
      </Stack>

      <CustomTextField
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
        onChange={(event) => setInputValue(Number(event.target.value))}
        value={inputValue}
        rule={{
          min: { min: 1 },
        }}
      />

      <CustomSlider sx={{ mt: 2.5 }} />

      <Button variant="contained" sx={{ mt: 2.5 }} fullWidth>
        Deposit
      </Button>
    </Box>
  );
};

export default DepositSection;
