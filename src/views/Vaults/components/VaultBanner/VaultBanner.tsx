import { Box, Button, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { usdaiSolanaMainnet } from 'src/constants/tokens/solana-ecosystem/solana-mainnet';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';
import useStakedInfo from 'src/hooks/useQueryHook/queryVault/useStakedInfo';
import { queryClient } from 'src/layout/Layout';
import { getDecimalToken } from 'src/utils';
import { compactNumber } from 'src/utils/format';

const VaultBanner = () => {
  const wallet = useWallet();
  const { stakeInfo } = useStakedInfo();

  const handleClaimReward = async () => {
    if (!wallet) return;

    const vaultContract = new VaultContract(wallet);
    await vaultContract.claimReward();
    await queryClient.invalidateQueries({ queryKey: ['useStakedInfo'] });
  };

  const reward = Number(stakeInfo?.pendingReward) / getDecimalToken(usdaiSolanaMainnet.address);

  return (
    <Stack
      sx={{
        borderRadius: '14px',
        background: 'linear-gradient(0deg, #F2F9A5 0%, #FEFFF3 100%)',
        color: '#000',
        height: 'fit-content',
        padding: '36px 32px 24px 32px',
        justifyContent: 'space-between',
        mb: 2,
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
      }}
    >
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <Typography variant="h6" fontWeight={600}>
          Staked Amount
        </Typography>
        <Typography variant="h2" fontWeight={700} fontSize="42px">
          ${compactNumber(stakeInfo?.amount || 0, 4)}
        </Typography>
        <Typography variant="body2">{stakeInfo?.amount} USDAI</Typography>
      </Box>

      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <Typography variant="h6" fontWeight={600}>
          Claimable Rewards
        </Typography>
        <Typography variant="h2" fontWeight={700} fontSize="42px">
          ${reward?.toFixed(4) || 0}
        </Typography>
        <Typography variant="body2">0 USDAI</Typography>
      </Box>

      <Button
        variant="contained"
        sx={{
          color: 'primary.main',
          bgcolor: '#1B1C14',
          boxShadow: 'none',
          my: 'auto',
          ':hover': {
            bgcolor: '#1B1C14',
            boxShadow: 'none',
          },
        }}
        onClick={handleClaimReward}
      >
        Claim Rewards
      </Button>
    </Stack>
  );
};

export default VaultBanner;
