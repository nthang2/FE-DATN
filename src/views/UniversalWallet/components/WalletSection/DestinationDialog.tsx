import { Box, Popover, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { mapNameNetwork } from 'src/constants/network';
import WalletConnectIcon from '../../../../components/General/WalletConnectIcon/WalletConnectIcon';
import { listNetwork } from '../../constant';
import { useDestinationNetworkState, useDestinationWalletState, useSourceNetworkState, useSourceWalletState } from '../../state/hooks';
import ListWalletEthereum from './ListWalletEthereum';
import ListWalletSolana from './ListWalletSolana';
import SelectedNetwork from './SelectedNetwork';
import useGetListWallet from '../../hooks/useGetListWallet';

type TProps = {
  error?: boolean;
};

const DestinationDialog = (props: TProps) => {
  const { error } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [destinationNetwork, setDestinationNetwork] = useDestinationNetworkState();
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();
  const [sourceWallet] = useSourceWalletState();
  const [sourceNetwork] = useSourceNetworkState();
  const { data: listWallet } = useGetListWallet(sourceWallet.chainId, sourceWallet.address);
  const open = Boolean(anchorEl);

  const destinationWalletIcon = useMemo(() => {
    if (destinationWallet.iconWalletName || destinationWallet.wallet) {
      if (destinationWallet.iconWalletName) {
        return <WalletConnectIcon Icon={destinationWallet.iconWalletName} size="20" style={{ marginRight: '8px', borderRadius: '50%' }} />;
      }

      return <img src={destinationWallet.wallet} style={{ width: '20px', height: '20px', borderRadius: '10px' }} />;
    }

    return <></>;
  }, [destinationWallet.iconWalletName, destinationWallet.wallet]);

  const checkDisableNetwork = (chainId: number) => {
    return listWallet?.wallets?.some((wallet) => wallet.chainId === chainId) || false;
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeNetwork = (network: string) => {
    if (sourceNetwork !== network && !checkDisableNetwork(mapNameNetwork[network].chainId)) {
      setDestinationNetwork(network);
      setDestinationWallet({ address: '', wallet: '', chainId: '' });
    }
  };

  const handleDisconnect = () => {
    setDestinationWallet({ address: '', wallet: '', chainId: '' });
    setDestinationNetwork('');
  };

  return (
    <Box>
      <Box onClick={handleClick} sx={{ position: 'relative' }}>
        <CustomTextField
          fullWidth
          variant="outlined"
          disabled
          error={error}
          placeholder="Select network, wallet and connect wallet..."
          InputProps={{
            startAdornment: destinationWalletIcon,
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
          <Stack gap={2} direction="column">
            <Typography variant="body1" fontWeight={600}>
              Select a network
            </Typography>

            <Stack gap={1}>
              {listNetwork.map((network) => {
                const networkInfo = mapNameNetwork[network];
                const isDisable = checkDisableNetwork(networkInfo.chainId) || sourceNetwork === networkInfo.id;
                const isActive = destinationNetwork === networkInfo.id && !isDisable;

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
                      ':hover':
                        sourceNetwork !== networkInfo.id && !isDisable ? { bgcolor: 'secondary.dark', borderColor: 'primary.main' } : {},
                      bgcolor: isActive ? 'secondary.dark' : 'transparent',
                      borderColor: isActive ? 'primary.main' : 'transparent',
                      opacity: isDisable ? '0.5' : '1',
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

          {destinationNetwork === 'solana' && <ListWalletSolana onDisconnect={handleDisconnect} isDestinationWallet={true} />}
          {destinationNetwork === 'ethereum' && <ListWalletEthereum onDisconnect={handleDisconnect} isDestinationWallet={true} />}
        </Box>
      </Popover>
    </Box>
  );
};

export default DestinationDialog;
