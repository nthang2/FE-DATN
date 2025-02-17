import { Box, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { Icon, TokenName } from 'crypto-token-icon';
import { ReactNode, useMemo, useState } from 'react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useStakedInfo from 'src/hooks/useQueryHook/queryVault/useStakedInfo';
import { queryClient } from 'src/layout/Layout';
import CustomSlider from '../CustomSlider/Slider';

const TokenUSDAIAmount = ({ children }: { children: ReactNode }) => (
  <Typography variant="body2" display="flex" alignItems="center" gap={1}>
    {children} <Icon tokenName={TokenName.USDAI} />
  </Typography>
);

const WithdrawSection = () => {
  const wallet = useWallet();
  const { stakeInfo } = useStakedInfo();
  const { asyncExecute, loading } = useAsyncExecute();

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

  const handleWithdraw = async () => {
    if (!wallet) return;
    const vaultContract = new VaultContract(wallet);

    await asyncExecute({
      fn: async () => {
        await vaultContract.withdraw(Number(removeAmount));
        await queryClient.invalidateQueries({ queryKey: ['useStakedInfo'] });
      },
    });

    setSliderValue(0);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2.5} sx={{ color: 'info.main' }}>
      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          Involving Amount
          <TooltipInfo title="title info" />
        </Typography>

        <TokenUSDAIAmount children={Number(stakeInfo?.amount)} />
      </Stack>

      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="body2">Removal Amount:</Typography>

        <TokenUSDAIAmount children={removeAmount} />
      </Stack>

      <CustomSlider min={0} max={100} onChange={(_e, value) => setSliderValue(Number(value))} />

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
