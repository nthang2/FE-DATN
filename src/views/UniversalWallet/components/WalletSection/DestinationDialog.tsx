import { Box, Popover, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { listNetwork } from '../../constant';
import { mapNameNetwork } from '../../network';
import ListWalletSolana from './ListWalletSolana';
import SelectedNetwork from './SelectedNetwork';
import { useDestinationNetworkState, useDestinationWalletState } from '../../state/hooks';
import ProviderSolana from 'src/components/Providers/ProviderSolana/ProviderSolana';
import ListWalletEthereum from './ListWalletEthereum';
import { walletIcon } from 'src/states/wallets/constants/walletIcon';
import ProviderEVMUniversalWallet from 'src/components/Providers/ProviderEVM/ProviderEVMUniversalWallet';

const DestinationDialog = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [destinationNetwork, setDestinationNetwork] = useDestinationNetworkState();
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();
  const open = Boolean(anchorEl);

  const walletIconMemo = useMemo(() => {
    if (destinationWallet.iconWalletName || destinationWallet.wallet) {
      if (destinationWallet.iconWalletName) {
        const WalletIconSvg = walletIcon[destinationWallet.iconWalletName];
        return <WalletIconSvg />;
      }

      return <img src={destinationWallet.wallet} style={{ width: '20px', height: '20px', borderRadius: '10px' }} />;
    }
  }, [destinationWallet]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!destinationNetwork.length) {
      setDestinationNetwork('solana');
    }

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeNetwork = (network: string) => {
    setDestinationNetwork(network);
    setDestinationWallet({ address: '', wallet: '' });
  };

  return (
    <Box>
      <Box onClick={handleClick} sx={{ position: 'relative' }}>
        <CustomTextField
          fullWidth
          variant="outlined"
          disabled
          placeholder="Select network, wallet and connect wallet..."
          InputProps={{
            startAdornment: walletIconMemo,
            endAdornment: <SelectedNetwork value={destinationNetwork} />,
            sx: { px: 2, py: 1, fontSize: '14px', height: 'unset' },
          }}
          inputProps={{ style: { padding: 0, paddingTop: 1, paddingLeft: '8px' } }}
          value={destinationWallet.address}
          sx={{ mt: 1 }}
        />
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            width: anchorEl ? anchorEl.getBoundingClientRect().width : undefined,
            border: '1px solid',
            borderColor: 'background.border',
          },
        }}
      >
        <Box sx={{ width: '100%', px: 2, py: 2.5, bgcolor: '#303030' }}>
          <Stack gap={2} direction="column" mb={2}>
            <Typography variant="body1" fontWeight={600}>
              Select a network
            </Typography>

            <Stack gap={1}>
              {listNetwork.map((network) => {
                const networkInfo = mapNameNetwork[network];

                return (
                  <Box
                    key={networkInfo.id}
                    className="flex-center"
                    flexDirection="column"
                    sx={{
                      borderRadius: '8px',
                      p: 1,
                      gap: 1,
                      width: '82px',
                      height: '70px',
                      cursor: 'pointer',
                      border: '1px solid transparent',
                      ':hover': { bgcolor: 'secondary.dark', borderColor: 'primary.main' },
                      bgcolor: destinationNetwork === networkInfo.id ? 'secondary.dark' : 'transparent',
                      borderColor: destinationNetwork === networkInfo.id ? 'primary.main' : 'transparent',
                    }}
                    onClick={() => handleChangeNetwork(networkInfo.id)}
                  >
                    {networkInfo.icon}
                    <Typography variant="body2" fontWeight={600}>
                      {networkInfo.name}
                    </Typography>
                  </Box>
                );
              })}
              <Box></Box>
            </Stack>
          </Stack>

          <ProviderSolana localStorageKey="destination.connectWallet">
            <ProviderEVMUniversalWallet>
              {destinationNetwork === 'solana' && <ListWalletSolana />}
              {destinationNetwork === 'ethereum' && <ListWalletEthereum />}
            </ProviderEVMUniversalWallet>
          </ProviderSolana>
        </Box>
      </Popover>
    </Box>
  );
};

export default DestinationDialog;
