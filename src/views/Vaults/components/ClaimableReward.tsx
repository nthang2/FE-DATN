import { Box, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { VaultContract } from 'src/contracts/solana/contracts/VaultContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useStakedInfo from 'src/hooks/useQueryHook/queryVault/useStakedInfo';
import { queryClient } from 'src/layout/Layout';
import { roundNumber } from 'src/utils/format';
import { useVaultSelectedNetwork } from '../state/hooks';
import useClamRewardVault from 'src/hooks/mutations/vault/useClamRewardVault';
import { mapNameNetwork } from 'src/constants/network';
import { useMemo } from 'react';
import useVaultInfoEVM from 'src/hooks/useQueryHook/queryVault/useVaultInfoEVM';

const ClaimableReward = () => {
  const wallet = useWallet();
  const { stakeInfo, status } = useStakedInfo();
  const { asyncExecute, loading } = useAsyncExecute();
  const [selectedNetwork] = useVaultSelectedNetwork();
  const { data: vaultInfoEVM, status: statusEVM } = useVaultInfoEVM();
  const { mutateAsync: claimRewardEVM } = useClamRewardVault();

  const isConnectedWallet = Boolean(wallet.publicKey);
  const statusWallet = useMemo(() => {
    if (selectedNetwork === mapNameNetwork.solana.id) {
      return status;
    } else {
      return statusEVM;
    }
  }, [selectedNetwork, status, statusEVM]);

  const rewardAmount = useMemo(() => {
    if (selectedNetwork === mapNameNetwork.solana.id) {
      return stakeInfo?.pendingReward || 0;
    } else {
      return vaultInfoEVM?.pendingReward || 0;
    }
  }, [selectedNetwork, stakeInfo?.pendingReward, vaultInfoEVM?.pendingReward]);

  const handleClaimReward = async () => {
    if (selectedNetwork === mapNameNetwork.solana.id) {
      if (!wallet) return;

      asyncExecute({
        fn: async () => {
          const vaultContract = new VaultContract(wallet);
          const hash = await vaultContract.claimReward();
          await queryClient.invalidateQueries({ queryKey: ['useStakedInfo'] });

          return hash;
        },
      });
    } else {
      asyncExecute({
        fn: async () => {
          const hash = await claimRewardEVM();
          await queryClient.invalidateQueries({ queryKey: ['useVaultInfoEVM'] });

          return hash;
        },
      });
    }
  };

  return (
    <Box
      sx={{
        p: '36px 20px 24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 3.5,
        bgcolor: 'background.content',
        borderRadius: '14px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, '& span': { flex: 1, alignSelf: 'flex-start' } }}>
        <Typography variant="h6" fontWeight={600}>
          Claimable Rewards
        </Typography>
        <ValueWithStatus
          status={[statusWallet]}
          value={
            <Typography variant="h2" fontWeight={700} fontSize="42px" flex={1} sx={{ color: 'primary.main' }}>
              ${roundNumber(rewardAmount || 0, 4)}
            </Typography>
          }
          skeletonStyle={{ bgcolor: '#c9c7c7', height: '60px', width: '50%' }}
        />

        <Typography variant="body2" color="text.secondary">
          {roundNumber(rewardAmount || 0, 6)} USDAI
        </Typography>
      </Box>

      <ButtonLoading
        variant="contained"
        sx={{
          color: 'primary.main',
          bgcolor: 'background.selection',
          boxShadow: 'none',
          my: 'auto',
          ':hover': {
            bgcolor: 'background.selection',
            boxShadow: 'none',
          },
          maxWidth: '150px',
        }}
        onClick={handleClaimReward}
        loading={loading}
        disabled={!isConnectedWallet}
      >
        Claim Rewards
      </ButtonLoading>
    </Box>
  );
};

export default ClaimableReward;
