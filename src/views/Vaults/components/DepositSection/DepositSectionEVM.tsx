import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { findTokenInfoByToken } from 'src/constants/tokens/mapNameToInfo';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import { queryClient } from 'src/layout/Layout';
import { TokenName } from 'src/libs/crypto-icons';
import useSummaryEVMConnect from 'src/states/wallets/evm-blockchain/hooks/useSummaryEVMConnect';
import useGetBalanceUniversalByToken from 'src/states/wallets/hooks/useGetBalanceUniversalByToken';
import { decimalFlood, roundNumber } from 'src/utils/format';
import CustomSelectToken from 'src/views/MyPortfolio/components/InputCustom/CustomSelectToken';
import { listTokenAvailableVaultEVM } from '../../constant';
import CustomSlider from '../CustomSlider/Slider';
import useDepositVault from 'src/hooks/mutations/vault/useDepositVault';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import ButtonApproveEVM from 'src/components/ButtonApproveEVM/ButtonApproveEVM';

const DepositSectionEVM = () => {
  const { address, status, networkName } = useSummaryEVMConnect();
  const { asyncExecute, loading } = useAsyncExecute();
  const { mutateAsync: deposit } = useDepositVault();

  const [inputValue, setInputValue] = useState<string>();
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedToken, setSelectedToken] = useState<string>(listTokenAvailableVaultEVM[TokenName.USDAI].address);
  const { balance, status: statusBalance } = useGetBalanceUniversalByToken({
    address,
    network: networkName,
    token: findTokenInfoByToken(selectedToken, networkName)?.symbol || TokenName.USDAI,
  });

  const isConnectedWallet = status === 'Connected';
  const isCanDeposit = useMemo(() => {
    if (!inputValue) return false;
    return Number(inputValue) <= balance?.toNumber() && Number(inputValue) > 0;
  }, [balance, inputValue]);

  const handleChangeSelectToken = (value: string) => {
    setSliderValue(0);
    setSelectedToken(value);
    setInputValue('');
  };

  const handleChangeSlider = (_event: Event, value: number | number[]) => {
    const amount = (Number(value) / 100) * balance?.toNumber();
    setInputValue(decimalFlood(amount, 6));
  };

  const handleDeposit = async () => {
    if (!address || !inputValue) return;

    await asyncExecute({
      fn: async () => {
        const hash = await deposit({ amount: Number(inputValue), selectedToken: selectedToken });
        await queryClient.invalidateQueries({ queryKey: ['useVaultInfoEVM'] });

        return hash;
      },
    });

    setInputValue('');
    setSliderValue(0);
  };

  useEffect(() => {
    const sliderPercent = ((Number(inputValue) || 0) / balance?.toNumber()) * 100;
    setSliderValue(sliderPercent);
  }, [balance, inputValue]);

  return (
    <Box>
      <Stack justifyContent="space-between" mb={0.5}>
        <Typography>Amount</Typography>
        <Typography display="flex" alignItems="center" gap={0.5}>
          Max:
          <ValueWithStatus
            status={[statusBalance]}
            value={<Typography flex={1}>{roundNumber(balance?.toNumber() || 0, 4)}</Typography>}
            skeletonStyle={{ bgcolor: '#c9c7c7', height: '26px', width: '40px' }}
          />
        </Typography>
      </Stack>

      <CustomTextField
        fullWidth
        variant="filled"
        inputType="number"
        placeholder="0"
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <CustomSelectToken
              options={Object.values(listTokenAvailableVaultEVM).map((token) => token.address)}
              value={selectedToken}
              onChange={(e) => handleChangeSelectToken(e.target.value as string)}
              network={networkName}
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
          max: { max: balance?.toNumber(), message: 'Amount deposit must smaller then your balance' },
          min: { min: 0.011, message: 'Amount deposit must greater then 0.01' },
        }}
      />

      <CustomSlider disabled={!isConnectedWallet} value={sliderValue} max={100} min={0} onChange={handleChangeSlider} sx={{ mt: 2.5 }} />

      <ButtonApproveEVM
        tokenAddress={selectedToken}
        network={networkName}
        amount={inputValue || '0'}
        variant="contained"
        sx={{ mt: 2.5 }}
        fullWidth
        actionButton={
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
        }
      />
    </Box>
  );
};

export default DepositSectionEVM;
