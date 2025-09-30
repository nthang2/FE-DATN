import { Box, Button, Drawer, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { SettingIcon, WalletIcon } from 'src/assets/icons';
import WalletConnectIcon from 'src/components/General/WalletConnectIcon/WalletConnectIcon';
import ModalConnectWallet from 'src/components/Modals/ConnectSolanaNetwork/ModalConnectWallet';
import ModalSettingAccount from 'src/components/Modals/ModalSettingAccount/ModalSettingAccount';
import { IconBNB, IconBSC, IconETH, IconSOL } from 'src/libs/crypto-icons';
import { useModalFunction } from 'src/states/modal/hooks';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import { formatAddress } from 'src/utils/format';
import { useDestinationNetworkState, useDestinationWalletState } from 'src/views/UniversalWallet/state/hooks';
import EVMWallet from './EVMWallet';
import HeadOfConnectWallet from './HeadOfConnectWallet';
import SolanaWallet from './SolanaWallet';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const netWorkConfig = {
  all: {
    id: 'all',
    name: 'All',
    icon: (
      <Box>
        <Box sx={{ display: 'flex' }}>
          <IconSOL sx={{ width: '14px', height: '14px' }} />
          <IconETH sx={{ width: '14px', height: '14px' }} />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <IconBSC sx={{ width: '14px', height: '14px' }} />
          <IconBNB sx={{ width: '14px', height: '14px' }} />
        </Box>
      </Box>
    ),
    value: 0,
  },
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
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [firstWalletSummary, secondWalletSummary] = useSummaryConnect();
  const [destinationNetwork, setDestinationNetwork] = useDestinationNetworkState();
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();

  // const handleDisconnect = () => {
  //   setDestinationWallet({ address: '', wallet: '', chainId: '' });
  //   setDestinationNetwork('');
  // };

  const { address, status, walletIcon, disconnect } = firstWalletSummary;
  const [openDrawer, setOpenDrawer] = useState<boolean>(true);
  const [tab, setTab] = useState<number>(0);

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

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
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
          <Stack alignItems="center">
            <Box display="flex" gap={1}>
              <WalletConnectIcon Icon={walletIcon} />
              <WalletConnectIcon Icon={secondWalletIcon} />
            </Box>
            <Stack
              sx={{ background: '#282825', p: 1, gap: '10px', borderRadius: '11px', cursor: 'pointer', alignItems: 'center' }}
              onClick={toggleDrawer(true)}
            >
              <WalletIcon />
              <Typography sx={{ display: { xs: 'none', md: 'block' } }}>{formatAddress(walletAddress)}</Typography>
              <SettingIcon />
            </Stack>

            {/* <Popover
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
            </Popover> */}
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
      </Stack>
      <Drawer disableScrollLock={false} open={openDrawer} onClose={toggleDrawer(false)} anchor="right">
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: '#191918',
            display: 'flex',
            width: { xs: '270px', md: '520px' },
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
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px ', gap: 1 }}>
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
            {tab == 1 && <SolanaWallet />}
            {tab == 2 && <EVMWallet onDisconnect={handleDisconnect} isDestinationWallet={true} />}
          </Box>
        </Box>
      </Drawer>
      <ModalConnectWallet open={openDialog} onClose={handleCloseDialog} />
    </>
  );
};

export default ConnectWalletSection;
