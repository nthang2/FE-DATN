import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { ArrowDown, WalletIcon } from 'src/assets/icons';
import WalletConnectIcon from 'src/components/Common/WalletConnectIcon/WalletConnectIcon';
import ModalConnectWallet from 'src/components/Modals/ConnectSolanaNetwork/ModalConnectWallet';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { formatAddress } from 'src/utils/format';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyTextToClipboard } from 'src/utils';

const ConnectWalletSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const { address, status, walletIcon, disconnect } = useSummarySolanaConnect();

  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const handleOpenAnchor = (event: React.MouseEvent<HTMLDivElement>) => {
    if (openDialog) return;
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAnchorEl(null);
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
        {status === 'Connected' ? (
          <Stack gap={2} alignItems="center">
            <WalletConnectIcon Icon={walletIcon} />
            <Stack sx={{ background: '#282825', p: 1, gap: 1, borderRadius: '11px', cursor: 'pointer' }} onClick={handleOpenAnchor}>
              <WalletIcon />
              {formatAddress(address)}
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
                  width: anchorEl?.offsetWidth,
                }}
              >
                <Typography onClick={() => copyTextToClipboard(address)} mb={2}>
                  {formatAddress(address)} <ContentCopyIcon sx={{ ml: 1, fontSize: '15px' }} />
                </Typography>
                <Typography onClick={disconnect}>Disconnect</Typography>
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
