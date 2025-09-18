import { Box, Popover, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import WalletConnectIcon from 'src/components/General/WalletConnectIcon/WalletConnectIcon';
import { mapNameNetwork } from 'src/constants/network';
import { listNetwork } from '../../constant';
import { useDestinationNetworkState, useDestinationWalletState, useSourceNetworkState, useSourceWalletState } from '../../state/hooks';
import ListWalletEthereum from './ListWalletEthereum';
import ListWalletSolana from './ListWalletSolana';
import SelectedNetwork from './SelectedNetwork';

const SourceWalletDialog = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [sourceWallet, setSourceWallet] = useSourceWalletState();
  const [sourceNetwork, setSourceNetwork] = useSourceNetworkState();
  const [destinationNetwork, setDestinationNetwork] = useDestinationNetworkState();
  const [, setDestinationWallet] = useDestinationWalletState();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeNetwork = (network: string) => {
    if (destinationNetwork !== network) {
      setSourceNetwork(network);
    }
  };

  const handleDisconnect = () => {
    setSourceNetwork('');
    setDestinationNetwork('');
    setSourceWallet({ address: '', wallet: '', chainId: '' });
    setDestinationWallet({ address: '', wallet: '', chainId: '' });
  };

  // useEffect(() => {
  //   if (address && networkName && networkName.toLowerCase() !== sourceNetwork) {
  //     setSourceNetwork(networkName.toLowerCase());
  //     setSourceWallet({ address, wallet: '', chainId, iconWalletName: walletIconSource });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [address, networkName]);

  return (
    <Box>
      <Box onClick={handleClick} sx={{ position: 'relative' }}>
        <CustomTextField
          fullWidth
          variant="outlined"
          inputType="number"
          placeholder="Connect your wallet"
          InputProps={{
            endAdornment: <SelectedNetwork value={sourceNetwork} />,
            startAdornment: (
              <WalletConnectIcon Icon={sourceWallet.iconWalletName} size="20" style={{ marginRight: '8px', borderRadius: '50%' }} />
            ),
            sx: { px: 2, py: 1, fontSize: '14px', height: 'unset' },
          }}
          inputProps={{ style: { padding: 0, paddingTop: 1 } }}
          disabled
          sx={{ mt: 1 }}
          value={sourceWallet.address || ''}
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
          <Stack gap={2} direction="column">
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
                      border: '1px solid transparent',
                      cursor: 'pointer',
                      ':hover': destinationNetwork !== networkInfo.id ? { bgcolor: 'secondary.dark', borderColor: 'primary.main' } : {},
                      bgcolor: sourceNetwork === networkInfo.id ? 'secondary.dark' : 'transparent',
                      borderColor: sourceNetwork === networkInfo.id ? 'primary.main' : 'transparent',
                      opacity: destinationNetwork === networkInfo.id ? '0.5' : '1',
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

          {sourceNetwork === 'solana' && <ListWalletSolana onDisconnect={handleDisconnect} />}
          {sourceNetwork === 'ethereum' && <ListWalletEthereum onDisconnect={handleDisconnect} />}
        </Box>
      </Popover>
    </Box>
  );
};

export default SourceWalletDialog;
