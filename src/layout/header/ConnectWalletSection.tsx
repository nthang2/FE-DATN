import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { ArrowDown, WalletIcon } from 'src/assets/icons';
import WalletConnectIcon from 'src/components/General/WalletConnectIcon/WalletConnectIcon';
import ModalConnectWallet from 'src/components/Modals/ConnectSolanaNetwork/ModalConnectWallet';
import { formatAddress } from 'src/utils/format';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyTextToClipboard } from 'src/utils';
import { useModalFunction } from 'src/states/modal/hooks';
import ModalSettingAccount from 'src/components/Modals/ModalSettingAccount/ModalSettingAccount';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';

const ConnectWalletSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [firstWalletSummary, secondWalletSummary] = useSummaryConnect();
  const { address, status, walletIcon, disconnect } = firstWalletSummary;
  const {
    address: secondWalletAddress,
    status: secondWalletStatus,
    walletIcon: secondWalletIcon,
    disconnect: secondWalletDisconnect,
  } = secondWalletSummary;
  const modalFunction = useModalFunction();

  const walletStatus = status === 'Connected' || secondWalletStatus === 'Connected';
  const walletAddress = address || secondWalletAddress;

  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    if (status === 'Connected') {
      disconnect();
    }

    if (secondWalletStatus === 'Connected') {
      secondWalletDisconnect();
    }
  };

  const handleOpenAnchor = (event: React.MouseEvent<HTMLDivElement>) => {
    if (openDialog) return;
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDialog = () => {
    setAnchorEl(null);
    setOpenDialog(false);
  };

  const handleSettingBtn = () => {
    modalFunction({
      type: 'openModal',
      data: { content: <ModalSettingAccount />, title: `Settings`, modalProps: { maxWidth: 'xs' } },
    });
  };

  return (
    <>
      <Stack
        sx={(theme) => ({
          background: theme.palette.background.accordion,
          p: '10px',
          borderRadius: 2,
          alignItems: 'center',
        })}
      >
        {walletStatus ? (
          <Stack gap={2} alignItems="center">
            <Box display="flex" gap={1}>
              <WalletConnectIcon Icon={walletIcon} />
              <WalletConnectIcon Icon={secondWalletIcon} />
            </Box>
            <Stack sx={{ background: '#282825', p: 1, gap: 1, borderRadius: '11px', cursor: 'pointer' }} onClick={handleOpenAnchor}>
              <WalletIcon />
              <Typography sx={{ display: { xs: 'none', md: 'block' } }}>{formatAddress(walletAddress)}</Typography>
              <ArrowDown />
            </Stack>

            <Popover
              open={!openDialog && Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleCloseAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{ textAlign: 'center' }}
            >
              <Box
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  width: { xs: '180px', md: anchorEl?.offsetWidth },
                }}
              >
                <Typography onClick={() => copyTextToClipboard(address)} mb={2}>
                  {formatAddress(address)} <ContentCopyIcon sx={{ ml: 1, fontSize: '15px' }} />
                </Typography>
                <Typography onClick={handleSettingBtn} mb={2}>
                  Settings
                </Typography>
                <Typography onClick={handleDisconnect}>Disconnect</Typography>
              </Box>
            </Popover>
          </Stack>
        ) : (
          <Button
            sx={(theme) => ({
              p: '6px 16px',
              background: theme.palette.background.default,
              color: theme.palette.common.white,
              ':hover': {
                background: theme.palette.background.button,
                color: theme.palette.common.black,
              },
              borderRadius: '11px',
            })}
            onClick={() => setOpenDialog(true)}
          >
            <Typography variant="body1" fontWeight={700}>
              Connect wallet
            </Typography>
          </Button>
        )}
      </Stack>

      <ModalConnectWallet open={openDialog} onClose={handleCloseDialog} />
    </>
  );
};

export default ConnectWalletSection;
