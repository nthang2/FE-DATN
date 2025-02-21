import { Box, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { Icon, TokenName } from 'crypto-token-icon';
import { useEffect, useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import { queryClient } from 'src/layout/Layout';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import CustomSlider from '../CustomSlider/Slider';

const DepositSection = () => {
  const wallet = useWallet();
  const { address } = useSummarySolanaConnect();
  const { balance } = useSolanaBalanceToken(address, TokenName.USDAI);
  const { asyncExecute, loading } = useAsyncExecute();

  const [inputValue, setInputValue] = useState<number>();
  const [sliderValue, setSliderValue] = useState(0);

  const isCanDeposit = useMemo(() => {
    if (!inputValue) return false;
    return inputValue <= balance.toNumber() && inputValue > 0;
  }, [balance, inputValue]);

  const handleChangeSlider = (_event: Event, value: number | number[]) => {
    const amount = (Number(value) / 100) * balance.toNumber();
    setInputValue(amount);
  };

  const handleDeposit = async () => {
    if (!wallet || !inputValue) return;

    const vaultContract = new VaultContract(wallet);
    await asyncExecute({
      fn: async () => {
        const hash = await vaultContract.deposit(inputValue);
        await queryClient.invalidateQueries({ queryKey: ['useStakedInfo'] });

        return hash;
      },
    });
    setInputValue(0);
    setSliderValue(0);
  };

  useEffect(() => {
    const sliderPercent = ((inputValue || 0) / balance.toNumber()) * 100;
    setSliderValue(sliderPercent);
  }, [balance, inputValue]);

  return (
    <Box>
      <Stack justifyContent="space-between" mb={0.5}>
        <Typography>Amount</Typography>
        <Typography>Max: {balance.toFixed(4)}</Typography>
      </Stack>

      <CustomTextField
        fullWidth
        variant="filled"
        type="number"
        placeholder="0"
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
        value={Number(inputValue?.toFixed(8))}
        rule={{
          max: { max: balance.toNumber(), message: 'Amount deposit must smaller then your balance' },
        }}
      />

      <CustomSlider value={sliderValue} max={100} min={0} onChange={handleChangeSlider} sx={{ mt: 2.5 }} />

      <ButtonLoading loading={loading} variant="contained" sx={{ mt: 2.5 }} fullWidth onClick={handleDeposit} disabled={!isCanDeposit}>
        Deposit
      </ButtonLoading>
    </Box>
  );
};

export default DepositSection;
