import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { walletIcon as walletIconEVM } from 'src/states/wallets/constants/walletIcon';
import { config } from 'src/states/wallets/evm-blockchain/config';
import { mapNameWalletIcon } from 'src/views/UniversalWallet/network';
import { useDestinationWalletState, useSourceWalletState } from 'src/views/UniversalWallet/state/hooks';
import { Connector, useConnect } from 'wagmi';
import { disconnect, getAccount } from 'wagmi/actions';

type IProps = {
  onDisconnect: () => void;
  isDestinationWallet?: boolean;
};

const EVMWallet = (props: IProps) => {
  const { isDestinationWallet, onDisconnect } = props;
  const { connectAsync, connectors } = useConnect();
  const { address, chainId, connector: connectorEVM } = getAccount(config);
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();
  const [sourceWallet, setSourceWallet] = useSourceWalletState();
  const walletIcon = connectorEVM ? connectorEVM.icon || walletIconEVM[connectorEVM.name] : undefined;

  async function handleConnect(connector: Connector) {
    try {
      disconnect(config);
      await connectAsync({ connector: connector });
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }

  const handleDisconnect = () => {
    disconnect(config);
    onDisconnect();
  };

  const handleClickBtn = (connector: Connector) => {
    if (connector.id === connectorEVM?.id) {
      handleDisconnect();
    } else {
      handleConnect(connector);
    }
  };

  useEffect(() => {
    if (isDestinationWallet) {
      if (address?.toString() !== destinationWallet.address) {
        setDestinationWallet({
          address: address?.toString() || '',
          wallet: connectorEVM?.icon || '',
          iconWalletName: walletIcon,
          chainId: String(chainId) || '',
        });
      }
    } else {
      if (address?.toString() !== sourceWallet.address) {
        setSourceWallet({
          address: address?.toString() || '',
          wallet: connectorEVM?.icon || '',
          iconWalletName: walletIcon,
          chainId: String(chainId) || '',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Stack gap={1} direction="column">
      <Stack direction="column">
        {sourceWallet &&
          connectors.map((connector, index) => {
            return (
              <Stack
                key={connector.id + index}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                p={2}
                borderBottom={index !== connectors.length - 1 ? '0.5px solid #323326' : 0}
              >
                <Box className="flex-start" gap={1}>
                  {mapNameWalletIcon[connector.name] || (
                    <Avatar src={connector.icon} style={{ width: '20px', height: '20px', borderRadius: '10px' }} />
                  )}
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {connector.name}
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  // color={isConnected ? 'error' : 'primary'}
                  onClick={() => handleClickBtn(connector)}
                  sx={{ height: '32px', bgcolor: '#46492F', border: '0px' }}
                >
                  <Typography variant="caption2" sx={{ color: '#E2E5C2' }}>
                    Connect
                  </Typography>
                </Button>
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};

export default EVMWallet;
