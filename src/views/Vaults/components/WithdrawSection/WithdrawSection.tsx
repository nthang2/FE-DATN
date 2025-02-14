import { Box, Button, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { ReactNode } from 'react';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import CustomSlider from '../CustomSlider/Slider';
import { useWallet } from '@solana/wallet-adapter-react';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract/VaultContract';

const TokenUSDAIAmount = ({ children }: { children: ReactNode }) => (
  <Typography variant="body2" display="flex" alignItems="center" gap={1}>
    {children} <Icon tokenName={TokenName.USDAI} />
  </Typography>
);

const WithdrawSection = () => {
  const wallet = useWallet();

  const handleWithdraw = async () => {
    if (!wallet) return;

    const vaultContract = new VaultContract(wallet);
    await vaultContract.deposit();
  };

  return (
    <Box display="flex" flexDirection="column" gap={2.5} sx={{ color: 'info.main' }}>
      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          Involving Amount
          <TooltipInfo title="title info" />
        </Typography>

        <TokenUSDAIAmount children={0} />
      </Stack>

      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="body2">Removal Amount:</Typography>

        <TokenUSDAIAmount children={0} />
      </Stack>

      <CustomSlider />

      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="body2">Remaining Amount</Typography>

        <TokenUSDAIAmount children={0} />
      </Stack>

      <Button variant="contained" fullWidth onClick={handleWithdraw}>
        Withdraw
      </Button>
    </Box>
  );
};

export default WithdrawSection;
