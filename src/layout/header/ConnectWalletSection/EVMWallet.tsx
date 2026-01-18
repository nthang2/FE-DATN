import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { mapNameNetwork } from 'src/constants/network';
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EVMWallet = (props: IProps) => {
  const { connectAsync, connectors } = useConnect();
  const { address, connector: connectorEVM } = getAccount(config);
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();
  const [sourceWallet, setSourceWallet] = useSourceWalletState();
  const walletIcon = connectorEVM ? connectorEVM.icon || walletIconEVM[connectorEVM.name] : undefined;

  async function handleConnect(connector: Connector) {
    try {
      disconnect(config);
      await connectAsync({ connector: connector });
      if (address?.toString() !== sourceWallet.address) {
        setSourceWallet({
          address: address?.toString() || '',
          wallet: connectorEVM?.icon || '',
          iconWalletName: walletIcon,
          chainId: mapNameNetwork.ethereum.chainId.toString(),
        });
      } else if (address?.toString() !== destinationWallet.address) {
        setDestinationWallet({
          address: address?.toString() || '',
          wallet: connectorEVM?.icon || '',
          iconWalletName: walletIcon,
          chainId: mapNameNetwork.ethereum.chainId.toString(),
        });
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }

  const handleClickBtn = (connector: Connector) => {
    if (connector.id === connectorEVM?.id) {
      return;
    } else {
      handleConnect(connector);
    }
  };

  return (
    <Stack gap={1} direction="column">
      <Stack direction="column">
        {sourceWallet &&
          connectors.map((connector, index) => {
            const isConnected = connector.id === connectorEVM?.id;
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
                  sx={{
                    height: '32px',
                    bgcolor: isConnected ? '#FFFFFF' : 'rgba(255, 182, 217, 1)',
                    border: '0px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '0',
                      height: '0',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.3)',
                      transform: 'translate(-50%, -50%)',
                      transition: 'width 0.6s, height 0.6s',
                    },
                    '&:hover': {
                      bgcolor: isConnected ? '#FFFFFF' : 'rgba(255, 159, 204, 1)',
                      transform: 'translateY(-2px)',
                      boxShadow: isConnected ? '0 6px 20px rgba(255, 182, 217, 0.3)' : '0 6px 20px rgba(255, 182, 217, 0.4)',
                      '&::before': {
                        width: isConnected ? '0' : '200px',
                        height: isConnected ? '0' : '200px',
                      },
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  <Typography variant="caption2" sx={{ color: isConnected ? 'rgba(255, 182, 217, 1)' : '#000', position: 'relative', zIndex: 1 }}>
                    {isConnected ? 'Connected' : 'Connect'}
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
