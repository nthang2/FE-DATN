import { Box, Button, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useStakedInfo from 'src/hooks/useQueryHook/queryVault/useStakedInfo';
import { queryClient } from 'src/layout/Layout';
import { compactNumber, roundNumber } from 'src/utils/format';

const VaultBanner = () => {
  const wallet = useWallet();
  const { stakeInfo, status } = useStakedInfo();
  const { asyncExecute } = useAsyncExecute();

  const handleClaimReward = async () => {
    if (!wallet) return;

    asyncExecute({
      fn: async () => {
        const vaultContract = new VaultContract(wallet);
        await vaultContract.claimReward();
        await queryClient.invalidateQueries({ queryKey: ['useStakedInfo'] });
      },
    });
  };

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
          <ValueWithStatus
            status={[status]}
            value={
              <Typography variant="h2" fontWeight={700} fontSize="42px">
                ${compactNumber(stakeInfo?.amount || 0, 4)}
              </Typography>
            }
            skeletonStyle={{ bgcolor: '#b7b4b4', height: '60px', width: '100%' }}
          />
        </Typography>
        <Typography variant="body2">{roundNumber(Number(stakeInfo?.amount || 0), 6)} USDAI</Typography>
      </Box>

      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <Typography variant="h6" fontWeight={600}>
          Claimable Rewards
        </Typography>
        <ValueWithStatus
          status={[status]}
          value={
            <Typography variant="h2" fontWeight={700} fontSize="42px" flex={1}>
              ${roundNumber(stakeInfo?.pendingReward || 0, 4)}
            </Typography>
          }
          skeletonStyle={{ bgcolor: '#c9c7c7', height: '60px', width: '100%' }}
        />

        <Typography variant="body2">{roundNumber(stakeInfo?.pendingReward || 0, 6)} USDAI</Typography>
      </Box>

      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <Typography variant="h6" fontWeight={600}>
          Min APR
        </Typography>
        <Typography variant="h2" fontWeight={700} fontSize="42px">
          20%
        </Typography>
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
