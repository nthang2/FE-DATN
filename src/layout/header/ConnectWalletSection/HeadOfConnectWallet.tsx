import { ArrowDropDown } from '@mui/icons-material';
import { Box, Button, IconButton, Popover, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { CopyIcon, DisconnectIcon, OutIcon } from 'src/assets/icons';
import WalletConnectIcon from 'src/components/General/WalletConnectIcon/WalletConnectIcon';
import { mapNameChainId } from 'src/constants/chainId';
import { mapNameNetwork } from 'src/constants/network';
import { chainIconNetwork } from 'src/states/wallets/constants/chainIcon';
import useSummaryEVMConnect from 'src/states/wallets/evm-blockchain/hooks/useSummaryEVMConnect';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { copyTextToClipboard } from 'src/utils';
import { formatAddress } from 'src/utils/format';

export default function HeadOfConnectWallet() {
  const wallets = useSummaryConnect();
  const [firstWalletSummary, secondWalletSummary] = useSummaryConnect();
  const { disconnect: disconnectSolana } = useSummarySolanaConnect();
  const { disconnect: disconnectEVM } = useSummaryEVMConnect();
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
    disconnect();
    secondWalletDisconnect();
  };

  return (
    <Box sx={{ p: 2 }}>
      {walletStatus ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {wallets
              .filter((item) => item.status == 'Connected')
              .map((wallet, index) => {
                const networkInfo = mapNameNetwork[mapNameChainId[wallet.chainId]].icon;
                return (
                  <>
                    <Box sx={{ position: 'relative' }}>
                      {index == 0 && <WalletConnectIcon Icon={walletIcon} />}
                      {index == 1 && <WalletConnectIcon Icon={secondWalletIcon} />}
                      <Box sx={{ position: 'absolute', right: '-30%', bottom: '-10%', zIndex: 1 }}>{networkInfo}</Box>
                    </Box>
                  </>
                );
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
                          <Box sx={{ position: 'relative', mr: 2 }}>
                            {index == 0 && <WalletConnectIcon Icon={walletIcon} />}
                            {index == 1 && <WalletConnectIcon Icon={secondWalletIcon} />}
                            <IconNetwork sx={{ position: 'absolute', bottom: 0, right: '-30%' }} />
                          </Box>
                          <Typography sx={{ color: '#FFFFFF' }}>{formatAddress(wallet.address)}</Typography>
                          <IconButton onClick={() => copyTextToClipboard(wallet.address)}>
                            <CopyIcon sx={{ px: 0.5 }} fontSize="medium" />
                          </IconButton>
                        </Box>
                        <Stack sx={{ gap: 1, alignItems: 'center' }} direction="row">
                          <Typography sx={{ color: 'text.secondary' }}>{wallet.chainName == 'Solana' ? 'Solana' : 'EVM'}</Typography>
                          <IconButton
                            onClick={() => {
                              if (wallet.chainName == 'Solana') {
                                disconnectSolana();
                              } else {
                                disconnectEVM();
                              }
                            }}
                          >
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
