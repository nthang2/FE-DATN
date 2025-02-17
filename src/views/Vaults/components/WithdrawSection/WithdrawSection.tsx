import { Box, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { Icon, TokenName } from 'crypto-token-icon';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useStakedInfo from 'src/hooks/useQueryHook/queryVault/useStakedInfo';
import { queryClient } from 'src/layout/Layout';
import CustomSlider from '../CustomSlider/Slider';
import CustomTextField from 'src/components/CustomForms/CustomTextField';

const TokenUSDAIAmount = ({ children }: { children: ReactNode }) => (
  <Typography variant="body2" display="flex" alignItems="center" gap={1}>
    {children} <Icon tokenName={TokenName.USDAI} />
  </Typography>
);

const WithdrawSection = () => {
  const wallet = useWallet();
  const { stakeInfo } = useStakedInfo();
  const { asyncExecute, loading } = useAsyncExecute();

  const [inputValue, setInputValue] = useState<number>();
  const [sliderValue, setSliderValue] = useState(0);

  const removeAmount = useMemo(() => {
    return ((sliderValue / 100) * Number(stakeInfo?.amount)).toFixed(4);
  }, [stakeInfo, sliderValue]);

  const remainingAmount = useMemo(() => {
    return (Number(stakeInfo?.amount) - Number(removeAmount)).toFixed(4);
  }, [stakeInfo, removeAmount]);

  const isCanWithdraw = useMemo(() => {
    return Number(removeAmount) > 0;
  }, [removeAmount]);

  const handleChangeSlider = (_event: Event, value: number | number[]) => {
    const amount = (Number(value) / 100) * Number(stakeInfo?.amount || 1);
    setInputValue(amount);
  };

  const handleWithdraw = async () => {
    if (!wallet) return;
    await asyncExecute({
      fn: async () => {
        const vaultContract = new VaultContract(wallet);
        await vaultContract.withdraw(Number(removeAmount));
        await queryClient.invalidateQueries({ queryKey: ['useStakedInfo'] });
        setSliderValue(0);
      },
    });
  };

  useEffect(() => {
    const sliderPercent = ((inputValue || 0) / Number(stakeInfo?.amount || 1)) * 100;
    setSliderValue(sliderPercent);
  }, [inputValue, stakeInfo?.amount]);

  return (
    <Box display="flex" flexDirection="column" gap={2.5} sx={{ color: 'info.main' }}>
      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          Involving Amount
          <TooltipInfo title="title info" />
        </Typography>

        <TokenUSDAIAmount children={Number(stakeInfo?.amount)} />
      </Stack>

      <Stack flexDirection="column" gap={1}>
        <Typography variant="body2">Removal Amount:</Typography>

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
            max: { max: Number(stakeInfo?.amount), message: 'Amount deposit must smaller then your balance' },
          }}
        />
      </Stack>

      <CustomSlider value={sliderValue} min={0} max={100} onChange={handleChangeSlider} />

      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="body2">Remaining Amount</Typography>

        <TokenUSDAIAmount children={remainingAmount} />
      </Stack>

      <ButtonLoading loading={loading} variant="contained" fullWidth onClick={handleWithdraw} disabled={!isCanWithdraw}>
        Withdraw
      </ButtonLoading>
    </Box>
  );
};

export default WithdrawSection;
