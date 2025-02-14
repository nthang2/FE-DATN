import { Box, Button, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { Icon, TokenName } from 'crypto-token-icon';
import { useEffect, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract/VaultContract';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import CustomSlider from '../CustomSlider/Slider';
import { queryClient } from 'src/layout/Layout';

const maxAmount = 500;

const DepositSection = () => {
  const wallet = useWallet();
  const { address } = useSummarySolanaConnect();
  const { balance } = useSolanaBalanceToken(address, TokenName.USDAI);

  const [inputValue, setInputValue] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const handleChangeSlider = (_event: Event, value: number | number[]) => {
    const amount = (Number(value) / 100) * balance.toNumber();
    setInputValue(amount);
  };

  const handleDeposit = async () => {
    if (!wallet) return;

    const vaultContract = new VaultContract(wallet);
    await vaultContract.deposit();
    await queryClient.invalidateQueries({ queryKey: ['useStakedInfo'] });
  };

  useEffect(() => {
    const sliderPercent = (inputValue / balance.toNumber()) * 100;
    setSliderValue(sliderPercent);
  }, [balance, inputValue]);

  return (
    <Box>
      <Stack justifyContent="space-between" mb={0.5}>
        <Typography>Amount</Typography>
        <Typography>Max: {balance.toFixed(2)}</Typography>
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
        value={Number(inputValue.toFixed(2))}
        rule={{
          min: { min: 0 },
          max: { max: maxAmount },
        }}
      />

      <CustomSlider value={sliderValue} max={100} min={0} onChange={handleChangeSlider} sx={{ mt: 2.5 }} />

      <Button variant="contained" sx={{ mt: 2.5 }} fullWidth onClick={handleDeposit}>
        Deposit
      </Button>
    </Box>
  );
};

export default DepositSection;
