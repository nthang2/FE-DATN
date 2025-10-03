import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';
import useGetListWallet from 'src/views/UniversalWallet/hooks/useGetListWallet';

const AlertUniversalWallet = () => {
  const { chainId, address } = useSummaryFirstActiveConnect();
  const listConnectWallet = useSummaryConnect();
  const { data: listWallet } = useGetListWallet(chainId, address);

  const isConnectAllUniversalWallet = useMemo(() => {
    if (!listWallet || !listWallet?.universalWallet) {
      return false;
    }

    return listWallet.wallets.every((wallet) => listConnectWallet.map((wallet) => wallet.address).indexOf(wallet.walletAddress) > -1);
  }, [listConnectWallet, listWallet]);

  return (
    <Box
      sx={{
        bgcolor: '#333331',
        p: 2,
        borderRadius: 2,
        position: 'fixed',
        bottom: 15,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: isConnectAllUniversalWallet ? 'none' : 'block',
      }}
    >
      <Typography flexWrap="nowrap" variant="body1">
        Universal Wallet is not connected
      </Typography>
    </Box>
  );
};

export default AlertUniversalWallet;
