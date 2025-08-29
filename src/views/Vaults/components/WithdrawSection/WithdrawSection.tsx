import { Box, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useSwapConfig from 'src/hooks/useQueryHook/querySwap/useSwapConfig';
import useStakedInfo from 'src/hooks/useQueryHook/queryVault/useStakedInfo';
import { queryClient } from 'src/layout/Layout';
import { TokenName } from 'src/libs/crypto-icons';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { decimalFlood } from 'src/utils/format';
import CustomSlider from '../CustomSlider/Slider';
import { listTokenAvailableVault } from '../../constant';
import CustomSelectToken from 'src/views/MyPortfolio/components/InputCustom/CustomSelectToken';

const TokenUSDAIAmount = ({ children }: { children: ReactNode }) => (
  <Typography variant="body2" display="flex" alignItems="center" gap={1}>
    {children} <IconToken tokenName={TokenName.USDAI} />
  </Typography>
);

const WithdrawSection = () => {
  const wallet = useWallet();
  const { stakeInfo } = useStakedInfo();
  const { asyncExecute, loading } = useAsyncExecute();
  const { handleGetSwapInstruction } = useSwapConfig();

  const [inputValue, setInputValue] = useState<string>();
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedToken, setSelectedToken] = useState<string>(listTokenAvailableVault[TokenName.USDAI].address);

  const isConnectedWallet = Boolean(wallet.publicKey);
  const removeAmount = useMemo(() => {
    return ((sliderValue / 100) * Number(stakeInfo?.amount)).toFixed(4);
  }, [stakeInfo, sliderValue]);

  const remainingAmount = useMemo(() => {
    return (Number(stakeInfo?.amount) - Number((sliderValue / 100) * Number(stakeInfo?.amount))).toFixed(4);
  }, [stakeInfo?.amount, sliderValue]);

  const isCanWithdraw = useMemo(() => {
    return Number(removeAmount) > 0;
  }, [removeAmount]);

  const handleChangeSelectToken = (value: string) => {
    setSliderValue(0);
    setSelectedToken(value);
    setInputValue('');
  };

  const handleChangeSlider = (_event: Event, value: number | number[]) => {
    const amount = (Number(value) / 100) * Number(stakeInfo?.amount || 0);
    setInputValue(decimalFlood(amount, 6));
  };

  const handleWithdraw = async () => {
    if (!wallet) return;
    await asyncExecute({
      fn: async () => {
        const vaultContract = new VaultContract(wallet);
        const { instruction, addressLookupTable } = await handleGetSwapInstruction(inputValue || '0', selectedToken, false);

        const hash = await vaultContract.withdraw(
          Number(decimalFlood(Number(inputValue), 6)),
          selectedToken,
          instruction || null,
          addressLookupTable
        );

        await queryClient.invalidateQueries({ queryKey: ['useStakedInfo'] });
        setSliderValue(0);
        setInputValue(undefined);

        return hash;
      },
    });
  };

  useEffect(() => {
    const sliderPercent = ((Number(inputValue) || 0) / Number(stakeInfo?.amount || 1)) * 100;
    setSliderValue(sliderPercent);
  }, [inputValue, stakeInfo?.amount]);

  return (
    <Box display="flex" flexDirection="column" gap={2.5} sx={{ color: 'info.main' }}>
      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          Involving Amount
          <TooltipInfo title="Amount deposited to the vault, not including rewards claimed." />
        </Typography>

        <TokenUSDAIAmount children={Number(stakeInfo?.amount || 0)} />
      </Stack>

      <Stack flexDirection="column" gap={1}>
        <Typography variant="body2">Removal Amount:</Typography>

        <CustomTextField
          fullWidth
          variant="filled"
          inputType="number"
          // inputMode="decimal"
          placeholder="0"
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
            max: { max: Number(stakeInfo?.amount), message: 'Amount deposit must smaller then your balance' },
            min: { min: 0.011, message: 'Amount deposit must greater then 0.01' },
          }}
        />
      </Stack>

      <CustomSlider disabled={!isConnectedWallet} value={sliderValue} min={0} max={100} onChange={handleChangeSlider} />

      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="body2">Remaining Amount</Typography>

        <TokenUSDAIAmount children={Number(remainingAmount) || 0} />
      </Stack>

      <ButtonLoading
        loading={loading}
        variant="contained"
        fullWidth
        onClick={handleWithdraw}
        disabled={!isConnectedWallet || !isCanWithdraw}
      >
        Withdraw
      </ButtonLoading>
    </Box>
  );
};

export default WithdrawSection;
