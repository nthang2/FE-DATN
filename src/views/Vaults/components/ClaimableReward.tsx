import { Box, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useStakedInfo from 'src/hooks/useQueryHook/queryVault/useStakedInfo';
import { queryClient } from 'src/layout/Layout';
import { roundNumber } from 'src/utils/format';

const ClaimableReward = () => {
  const wallet = useWallet();
  const { stakeInfo, status } = useStakedInfo();
  const { asyncExecute, loading } = useAsyncExecute();

  const handleClaimReward = async () => {
    if (!wallet) return;

    asyncExecute({
      fn: async () => {
        const vaultContract = new VaultContract(wallet);
        const hash = await vaultContract.claimReward();
        await queryClient.invalidateQueries({ queryKey: ['useStakedInfo'] });

        return hash;
      },
    });
  };

  return (
    <Box
      sx={{
        p: '36px 20px 24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3.5,
        bgcolor: '#2A2A2A',
        borderRadius: '14px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, '& span': { flex: 1, alignSelf: 'flex-start' } }}>
        <Typography variant="h6" fontWeight={600}>
          Claimable Rewards
        </Typography>
        <ValueWithStatus
          status={[status]}
          value={
            <Typography variant="h2" fontWeight={700} fontSize="42px" flex={1} sx={{ color: 'primary.main' }}>
              ${roundNumber(stakeInfo?.pendingReward || 0, 4)}
            </Typography>
          }
          skeletonStyle={{ bgcolor: '#c9c7c7', height: '60px', width: '50%' }}
        />

        <Typography variant="body2" color="text.secondary">
          {roundNumber(stakeInfo?.pendingReward || 0, 6)} USDAI
        </Typography>
      </Box>

      <ButtonLoading
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
          maxWidth: '150px',
        }}
        onClick={handleClaimReward}
        loading={loading}
      >
        Claim Rewards
      </ButtonLoading>
    </Box>
  );
};

export default ClaimableReward;
