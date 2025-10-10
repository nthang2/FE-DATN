import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useMemo } from 'react';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';
import useGetListWallet from 'src/views/UniversalWallet/hooks/useGetListWallet';
import WarningIcon from '@mui/icons-material/Warning';

const AlertUniversalWallet = () => {
  const { chainId, address } = useSummaryFirstActiveConnect();
  const listConnectWallet = useSummaryConnect();
  const { data: listWallet } = useGetListWallet(chainId, address);
  const navigate = useNavigate();

  const isConnectAllUniversalWallet = useMemo(() => {
    if (!listWallet || !listWallet?.universalWallet) {
      return false;
    }

    return listWallet.wallets.every((wallet) => listConnectWallet.map((wallet) => wallet.address).indexOf(wallet.walletAddress) > -1);
  }, [listConnectWallet, listWallet]);

  const handleGoToUniversalWallet = () => {
    navigate('/universal-wallet');
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        position: 'fixed',
        bottom: 15,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: isConnectAllUniversalWallet ? 'none' : 'flex',
        alignItems: 'center',
        gap: 1,
        background: 'linear-gradient(36deg,rgb(73, 5, 5)   0%, #AC0000 100%)',
        maxWidth: '100vw',
        width: 'max-content',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Stack alignItems="center" gap={1}>
        <WarningIcon sx={{ fontSize: 24, color: '#D52020' }} />
        <Typography flexWrap="nowrap" variant="body2">
          Your connected wallet not linked to a Universal Wallet or not created yet
        </Typography>
      </Stack>

      <Button variant="contained" size="small" sx={{ ml: 2 }} onClick={handleGoToUniversalWallet}>
        Go to universal wallet
      </Button>
    </Box>
  );
};

export default AlertUniversalWallet;
