import { Box, Divider, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import StabilityQuestionTooltip from './StabilityQuestionTooltip';
import VaultAmount from './VaultAmount';
import { useModalFunction } from 'src/states/modal/hooks';
import LiquidationRewardModal from './LiquidationRewardModal';
import StakeModal from './StakeModal';
import UnstakeModal from './UnstakeModal';
import useGetVaultInfo from 'src/hooks/useQueryHook/queryLiquidation/useGetVaultInfo';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';

const StabilityVault = () => {
  const { address } = useSummarySolanaConnect();
  const { balance } = useSolanaBalanceToken(address, TokenName.USDAI);
  const { data: vaultInfo, status: vaultStatus } = useGetVaultInfo();
  const modalFunction = useModalFunction();

  const handleOpenModalClaim = () => {
    modalFunction({
      type: 'openModal',
      data: { content: <LiquidationRewardModal />, title: `Liquidation Rewards`, modalProps: { maxWidth: 'sm' } },
    });
  };

  const handleOpenModalStake = () => {
    modalFunction({
      type: 'openModal',
      data: { content: <StakeModal />, title: `Deposit Liquidity`, modalProps: { maxWidth: 'xs' } },
    });
  };

  const handleOpenModalUnstake = () => {
    modalFunction({
      type: 'openModal',
      data: { content: <UnstakeModal />, title: `Withdraw Liquidity`, modalProps: { maxWidth: 'xs' } },
    });
  };

  return (
    <BoxCustom
      sx={{
        p: 3.75,
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack gap={1.5} alignItems="center">
        <Icon tokenName={TokenName.USDAI} sx={{ fontSize: '42px' }} />
        <Box>
          <StabilityQuestionTooltip content="Stability Pool" tooltipText="Idk wait update" />
          <Typography variant="body2" color="info.main">
            Stake <strong style={{ color: '#E4E3D6' }}>USDAI </strong>
            to earn discounted crypto
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ borderColor: '#474744', height: '1px' }} />

      <Stack direction="column" gap={1}>
        <Stack justifyContent="space-between">
          <Typography variant="body1">Wallet</Typography>
          <VaultAmount amount={balance.toNumber()} />
        </Stack>

        <Stack justifyContent="space-between">
          <Typography variant="body1">Staked</Typography>
          <ValueWithStatus status={[vaultStatus]} value={<VaultAmount amount={vaultInfo?.deposit || 0} />} />
        </Stack>

        <Stack justifyContent="space-between">
          <StabilityQuestionTooltip content="APR" tooltipText="Idk wait update" fontWeight={400} color="#fff" />
          <Typography variant="body1" fontWeight={700} color="primary">
            4%
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ borderColor: '#474744', height: '1px' }} />

      <Stack alignItems={'center'} justifyContent="space-between">
        <Box>
          <StabilityQuestionTooltip content=" Liquidation Rewards" tooltipText="Idk wait update" />
          <Typography variant="body1" fontWeight={700} color="primary">
            $0
          </Typography>
        </Box>

        <ButtonLoading loading={false} onClick={handleOpenModalClaim} sx={{ bgcolor: '#46492F', color: 'text.primary' }}>
          Claim
        </ButtonLoading>
      </Stack>

      {/* <Divider sx={{ borderColor: '#474744', height: '1px' }} /> */}

      {/* <Stack justifyContent="space-between">
        <Typography variant="body1">Total Staked</Typography>
        <VaultAmount amount={669523.99} />
      </Stack> */}

      <Stack gap={2} mt={2}>
        <ButtonLoading variant="contained" fullWidth loading={false} onClick={handleOpenModalUnstake}>
          Withdraw
        </ButtonLoading>

        <ButtonLoading variant="contained" fullWidth loading={false} onClick={handleOpenModalStake}>
          Deposit
        </ButtonLoading>
      </Stack>
    </BoxCustom>
  );
};

export default StabilityVault;
