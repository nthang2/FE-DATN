import { Box, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { findTokenNameSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useSwapConfig from 'src/hooks/useQueryHook/querySwap/useSwapConfig';
import { queryClient } from 'src/layout/Layout';
import { TokenName } from 'src/libs/crypto-icons';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { decimalFlood } from 'src/utils/format';
import CustomSelectToken from 'src/views/MyPortfolio/components/InputCustom/CustomSelectToken';
import { listTokenAvailableVault } from '../../constant';
import CustomSlider from '../CustomSlider/Slider';

const DepositSection = () => {
  const wallet = useWallet();
  const { address } = useSummarySolanaConnect();
  const { asyncExecute, loading } = useAsyncExecute();
  const { handleGetSwapInstruction } = useSwapConfig();

  const [inputValue, setInputValue] = useState<string>();
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedToken, setSelectedToken] = useState<string>(listTokenAvailableVault[TokenName.USDAI].address);
  const { balance } = useSolanaBalanceToken(address, findTokenNameSolana[selectedToken]!);

  const isConnectedWallet = Boolean(wallet.publicKey);
  const isCanDeposit = useMemo(() => {
    if (!inputValue) return false;
    return Number(inputValue) <= balance.toNumber() && Number(inputValue) > 0;
  }, [balance, inputValue]);

  const handleChangeSelectToken = (value: string) => {
    setSliderValue(0);
    setSelectedToken(value);
    setInputValue('0');
  };

  const handleChangeSlider = (_event: Event, value: number | number[]) => {
    const amount = (Number(value) / 100) * balance.toNumber();
    setInputValue(decimalFlood(amount, 6));
  };

  const handleDeposit = async () => {
    if (!wallet || !inputValue) return;

    const vaultContract = new VaultContract(wallet);
    const { instruction, amount } = await handleGetSwapInstruction(inputValue, selectedToken, true);

    await asyncExecute({
      fn: async () => {
        const hash = await vaultContract.deposit(amount.toString(), instruction);
        await queryClient.invalidateQueries({ queryKey: ['useStakedInfo'] });

        return hash;
      },
    });

    setInputValue('');
    setSliderValue(0);
  };

  useEffect(() => {
    const sliderPercent = ((Number(inputValue) || 0) / balance.toNumber()) * 100;
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
        inputType="number"
        placeholder="0"
        disabled={!isConnectedWallet}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <CustomSelectToken
              options={Object.values(listTokenAvailableVault).map((token) => token.address)}
              value={selectedToken}
              onChange={(e) => handleChangeSelectToken(e.target.value as string)}
              sx={{
                py: 3,
                borderRadius: '10px',
              }}
            />
          ),
          sx: { padding: 2, fontSize: '24px', height: 'unset' },
        }}
        inputProps={{ style: { padding: 0 } }}
        sx={{ borderRadius: '16px' }}
        onChange={(event) => setInputValue(event.target.value)}
        value={inputValue}
        rule={{
          max: { max: balance.toNumber(), message: 'Amount deposit must smaller then your balance' },
        }}
      />

      <CustomSlider disabled={!isConnectedWallet} value={sliderValue} max={100} min={0} onChange={handleChangeSlider} sx={{ mt: 2.5 }} />

      <ButtonLoading
        loading={loading}
        variant="contained"
        sx={{ mt: 2.5 }}
        fullWidth
        onClick={handleDeposit}
        disabled={!isConnectedWallet || !isCanDeposit}
      >
        Deposit
      </ButtonLoading>
    </Box>
  );
};

export default DepositSection;
