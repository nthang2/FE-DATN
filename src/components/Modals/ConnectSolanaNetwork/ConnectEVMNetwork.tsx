import { Box, Grid2 as Grid } from '@mui/material';
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi';
import { toast } from 'react-toastify';
import LoadingIcon from 'src/assets/LoadingIcon';
import BoxOptionWallet from 'src/components/General/BoxOptionWallet/BoxOptionWallet';
import ButtonCustom from 'src/components/General/ButtonCustom/ButtonCustom';
import { TWalletStatus } from 'src/states/wallets/types';

interface IProps {
  onClose: () => void;
}

export default function ConnectEVMNetwork(props: IProps) {
  const { address, connector: currentConnector, isConnected, isConnecting } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { onClose } = props;

  async function handleConnect(connector: Connector) {
    try {
      if (isConnected && currentConnector) {
        await disconnect();
      }
      await connectAsync({ connector });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }

  return (
    <Grid container spacing={1}>
      {isConnecting && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '16px',
            display: 'flex',
            placeItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: 'rgb(255 255 255 / 12%)',
            zIndex: 1,
            backdropFilter: 'blur(2px)',
          }}
        >
          <LoadingIcon sx={{ width: '100px', height: '100px' }} />
        </Box>
      )}
      {connectors.map((connector, index) => {
        let status: TWalletStatus = 'Disconnected';
        let button;
        const isConnected = connector.id === currentConnector?.id;

        // Check if wallet is installed (for MetaMask, check if window.ethereum exists)
        const isWalletInstalled =
          connector.name === 'MetaMask' ? typeof window !== 'undefined' && (window as unknown as { ethereum?: unknown }).ethereum : true; // For other connectors, assume they're available

        if (!isWalletInstalled) {
          status = 'NotInstalled';
          button = (
            <ButtonCustom onClick={() => window.open(connector.name === 'MetaMask' ? 'https://metamask.io/' : '#', '_blank')}>
              Install
            </ButtonCustom>
          );
        } else if (isConnected) {
          status = 'Connected';
          button = (
            <ButtonCustom
              color="error"
              variant="contained"
              sx={{ color: 'white', opacity: '1!important' }}
              onClick={async () => {
                await disconnect();
              }}
            >
              Disconnect
            </ButtonCustom>
          );
        } else if (isConnecting) {
          status = 'Connecting';
          button = <ButtonCustom>Connecting...</ButtonCustom>;
        } else {
          status = 'Disconnected';
          button = address ? (
            <ButtonCustom sx={{}} onClick={() => handleConnect(connector)}>
              Switch
            </ButtonCustom>
          ) : (
            <ButtonCustom sx={{}} onClick={() => handleConnect(connector)}>
              Connect
            </ButtonCustom>
          );
        }

        return (
          <Grid component="div" key={connector.id + index + status} size={{ xs: 12, md: 6 }}>
            <BoxOptionWallet
              key={connector.id + index + status}
              name={connector.name}
              icon={{
                key: connector.name,
                replaceUrl: connector.icon || '',
              }}
              status={status}
              isConnected={isConnected}
              buttonF={button}
            ></BoxOptionWallet>
          </Grid>
        );
      })}
    </Grid>
  );
}
