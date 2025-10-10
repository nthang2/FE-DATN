import { Box, Button, Drawer, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { WalletIcon } from 'src/assets/icons';
import WalletConnectIcon from 'src/components/General/WalletConnectIcon/WalletConnectIcon';
import { mapNameChainId } from 'src/constants/chainId';
import { mapNameNetwork } from 'src/constants/network';
import { IconETH, IconSOL } from 'src/libs/crypto-icons';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import { formatAddress } from 'src/utils/format';
import EVMWallet from './EVMWallet';
import HeadOfConnectWallet from './HeadOfConnectWallet';
import SolanaWallet from './SolanaWallet';

const netWorkConfig = {
  solana: {
    id: 'solana',
    name: 'SOL',
    icon: <IconSOL />,
    value: 1,
  },
  ethereum: {
    id: 'ethereum',
    name: 'EVM',
    icon: <IconETH />,
    value: 2,
  },
};

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const ConnectWalletSection = () => {
  const [firstWalletSummary, secondWalletSummary] = useSummaryConnect();

  const { address, status, walletIcon, chainId } = firstWalletSummary;
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(0);

  const {
    address: secondWalletAddress,
    status: secondWalletStatus,
    walletIcon: secondWalletIcon,
    disconnect: secondWalletDisconnect,
    chainId: secondWalletChainId,
  } = secondWalletSummary;

  const walletStatus = status === 'Connected' || secondWalletStatus === 'Connected';
  const walletAddress = address || secondWalletAddress;

  const handleDisconnect = () => {
    if (secondWalletStatus === 'Connected') {
      secondWalletDisconnect();
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      {walletStatus ? (
        <Stack alignItems="center" sx={{ gap: 1 }}>
          <Box
            display="flex"
            gap={1}
            sx={{
              background: '#282825',
              p: 1,
              gap: '10px',
              borderRadius: '11px',
              cursor: 'pointer',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Box className="flex-center" sx={{ position: 'relative' }}>
              <WalletConnectIcon Icon={walletIcon} />
              {status == 'Connected' && (
                <Box sx={{ position: 'absolute', right: '-20%', bottom: '-50%' }}>{mapNameNetwork[mapNameChainId[chainId]].icon}</Box>
              )}
            </Box>
            <Box className="flex-center" sx={{ position: 'relative' }}>
              <WalletConnectIcon Icon={secondWalletIcon} />
              {secondWalletStatus == 'Connected' && (
                <Box sx={{ position: 'absolute', right: '-20%', bottom: '-50%' }}>
                  {mapNameNetwork[mapNameChainId[secondWalletChainId]].icon}
                </Box>
              )}
            </Box>
          </Box>
          <Stack
            sx={{
              background: '#282825',
              p: 1,
              gap: '10px',
              borderRadius: '11px',
              cursor: 'pointer',
              alignItems: 'center',
              height: '100%',
            }}
            onClick={toggleDrawer(true)}
          >
            <WalletIcon />
            <Typography sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 600 }} variant="body2">
              {secondWalletAddress && address ? 'My Wallets' : formatAddress(walletAddress)}
            </Typography>
          </Stack>
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
          onClick={toggleDrawer(true)}
        >
          <Typography variant="body1" fontWeight={700}>
            Connect wallet
          </Typography>
        </Button>
      )}
      <Drawer disableScrollLock={false} open={openDrawer} onClose={toggleDrawer(false)} anchor="right">
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: '#191918',
            display: 'flex',
            width: { xs: '100%', md: '520px' },
            borderRadius: '0px 16px 16px 0px',
          }}
        >
          <Tabs
            scrollButtons={false}
            orientation="vertical"
            variant="scrollable"
            value={tab}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: '#323326', width: '120px' }}
          >
            {Object.entries(netWorkConfig).map(([k, v]) => {
              return (
                <Tab
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: '#34362A',
                    },
                  }}
                  key={k}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      {v.icon}
                      <Typography sx={{ fontWeight: 600, color: '#FFFFFF' }}>{v.name}</Typography>
                    </Box>
                  }
                  {...a11yProps(v.value)}
                />
              );
            })}
          </Tabs>
          <Box sx={{ width: '100%', py: 2, px: 3, overflowY: 'auto' }}>
            <HeadOfConnectWallet />
            {tab == 0 && <SolanaWallet onDisconnect={handleDisconnect} isDestinationWallet={true} />}
            {tab == 1 && <EVMWallet onDisconnect={handleDisconnect} isDestinationWallet={true} />}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ConnectWalletSection;
