import { ArrowDropDown } from '@mui/icons-material';
import { Box, Button, IconButton, Popover, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { CopyIcon, DisconnectIcon, OutIcon } from 'src/assets/icons';
import { mapNameChainId } from 'src/constants/chainId';
import { mapNameNetwork } from 'src/constants/network';
import { chainIconNetwork } from 'src/states/wallets/constants/chainIcon';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import { copyTextToClipboard } from 'src/utils';
import { formatAddress } from 'src/utils/format';
import { mapNameWalletIcon } from 'src/views/UniversalWallet/network';
import { useDisconnect } from 'wagmi';

export default function HeadOfConnectWallet() {
  const wallets = useSummaryConnect();
  const { disconnect: disconnectSOL } = useWallet();
  const { disconnect: disconectEVM } = useDisconnect();
  const [firstWalletSummary, secondWalletSummary] = useSummaryConnect();
  const {
    address: secondWalletAddress,
    status: secondWalletStatus,
    walletIcon: secondWalletIcon,
    disconnect: secondWalletDisconnect,
  } = secondWalletSummary;
  const { address, status, walletIcon, disconnect } = firstWalletSummary;

  const walletStatus = status === 'Connected' || secondWalletStatus === 'Connected';

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = async () => {
    await Promise.all([disconnectSOL(), disconectEVM()]);
  };

  return (
    <Box>
      {walletStatus ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Box sx={{ display: 'flex' }}>
            {wallets
              .filter((item) => item.status == 'Connected')
              .map((wallet, index) => {
                const networkInfo = mapNameNetwork[mapNameChainId[wallet.chainId]].icon;
                return <Box>{networkInfo}</Box>;
              })}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: '10px 6px',
                bgcolor: '#2A2B22',
                borderRadius: '8px',
                border: '1px solid #919283',
              }}
              onClick={handleClick}
            >
              <Typography>{wallets.filter((item) => item.status == 'Connected').length} wallets</Typography>
              <ArrowDropDown />
            </Button>
            <Popover
              id={'popover_detail_wallet'}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ p: 0.5, bgcolor: '#3d3c3b' }}>
                {wallets
                  .filter((item) => item.status == 'Connected')
                  .map((wallet, index) => {
                    const IconNetwork = chainIconNetwork[wallet.chainId];
                    return (
                      <Box
                        key={index}
                        sx={{
                          padding: '16px 4px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '368px',
                          borderBottom: '0.5px solid #565652',
                          '&:last-child': { borderBottom: 'none' },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <IconNetwork sx={{ position: 'relative', mr: 1 }}>
                            <Box sx={{ borderRadius: '50%', position: 'absolute', right: 0, bottom: 0, zIndex: 1 }}>
                              {mapNameWalletIcon[wallet.walletName]}
                            </Box>
                          </IconNetwork>
                          <Typography sx={{ color: '#FFFFFF' }}>{formatAddress(wallet.address)}</Typography>
                          <IconButton onClick={() => copyTextToClipboard(wallet.address)}>
                            <CopyIcon sx={{ px: 0.5 }} fontSize="medium" />
                          </IconButton>
                        </Box>
                        <Stack sx={{ gap: 1, alignItems: 'center' }} direction="row">
                          <Typography sx={{ color: 'text.secondary' }}>{wallet.chainName == 'Solana' ? 'Solana' : 'EVM'}</Typography>
                          <IconButton>
                            <OutIcon />
                          </IconButton>
                        </Stack>
                      </Box>
                    );
                  })}
              </Box>
            </Popover>
            <IconButton onClick={handleDisconnect}>
              <DisconnectIcon />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Typography sx={{ color: 'white', fontWeight: 600 }}>Connect Wallet</Typography>
      )}
    </Box>
  );
}
