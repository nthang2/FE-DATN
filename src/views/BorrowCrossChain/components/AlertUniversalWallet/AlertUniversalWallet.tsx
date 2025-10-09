import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useMemo } from 'react';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';
import useGetListWallet from 'src/views/UniversalWallet/hooks/useGetListWallet';

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
        gap: 3,
        background: 'linear-gradient(90deg, #e55e00 0%, #e12731 100%)',
      }}
    >
      <Typography flexWrap="nowrap" variant="body1">
        Your connected wallet not linked to a Universal Wallet or not created yet
      </Typography>

      <Button variant="contained" size="small" onClick={handleGoToUniversalWallet}>
        Go to universal wallet
      </Button>
    </Box>
  );
};

export default AlertUniversalWallet;
