import { Box, Button, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { ReactNode, useMemo, useState } from 'react';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import CustomSlider from '../CustomSlider/Slider';
import { useWallet } from '@solana/wallet-adapter-react';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';
import { queryClient } from 'src/layout/Layout';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';

const TokenUSDAIAmount = ({ children }: { children: ReactNode }) => (
  <Typography variant="body2" display="flex" alignItems="center" gap={1}>
    {children} <Icon tokenName={TokenName.USDAI} />
  </Typography>
);

const WithdrawSection = () => {
  const wallet = useWallet();
  const { address } = useSummarySolanaConnect();
  const { balance } = useSolanaBalanceToken(address, TokenName.USDAI);

  const [sliderValue, setSliderValue] = useState(0);

  const handleWithdraw = async () => {
    if (!wallet) return;

    const vaultContract = new VaultContract(wallet);
    await vaultContract.deposit();
    await queryClient.invalidateQueries({ queryKey: ['useStakedInfo'] });
  };

  const removeAmount = useMemo(() => {
    return ((sliderValue / 100) * balance.toNumber()).toFixed(2);
  }, [balance, sliderValue]);

  const remainingAmount = useMemo(() => {
    return balance.minus(removeAmount).toNumber().toFixed(2);
  }, [balance, removeAmount]);

  return (
    <Box display="flex" flexDirection="column" gap={2.5} sx={{ color: 'info.main' }}>
      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          Involving Amount
          <TooltipInfo title="title info" />
        </Typography>

        <TokenUSDAIAmount children={balance.toFixed(2)} />
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

      <Button variant="contained" fullWidth onClick={handleWithdraw}>
        Withdraw
      </Button>
    </Box>
  );
};

export default WithdrawSection;
