import { Adapter, WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import { TWalletStatus } from 'src/states/wallets/types';
import { Box, CircularProgress, Grid2 as Grid } from '@mui/material';
import BoxOptionWallet from 'src/components/Common/BoxOptionWallet/BoxOptionWallet';
import ButtonCustom from 'src/components/Common/ButtonCustom/ButtonCustom';

export default function ConnectSolanaNetwork() {
  const { connecting, disconnect, publicKey, select, wallet, wallets } = useWallet();

  async function handleConnect(adapter: Adapter) {
    try {
      if (wallet) {
        await disconnect();
        await wallet.adapter.disconnect();
      }
      await select(adapter.name);
      // await connect();
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }

  return (
    <Grid container spacing={1}>
      {connecting && (
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
          <CircularProgress sx={{ fontSize: '100px' }} />
        </Box>
      )}
      {wallets.map((wallet, index) => {
        let status: TWalletStatus = 'Disconnected';
        let button;

        switch (wallet.readyState) {
          case WalletReadyState.NotDetected:
            status = 'NotInstalled';
            button = <ButtonCustom onClick={() => window.open(wallet.adapter.url, '_blank')}>Install</ButtonCustom>;
            break;
          case WalletReadyState.Installed:
          case WalletReadyState.Loadable:
            if (wallet.adapter.connected) {
              status = 'Connected';
              button = (
                <ButtonCustom
                  color="error"
                  variant="contained"
                  sx={{ color: 'white', opacity: '1!important' }}
                  onClick={async () => {
                    await disconnect();
                    await wallet.adapter.disconnect();
                  }}
                >
                  Disconnect
                </ButtonCustom>
              );
              break;
            }
            if (wallet.adapter.connecting) {
              status = 'Connecting';
              button = <ButtonCustom>Connecting...</ButtonCustom>;
              break;
            }

            status = 'Disconnected';
            button = publicKey ? (
              <ButtonCustom sx={{}} onClick={() => handleConnect(wallet.adapter)}>
                Switch
              </ButtonCustom>
            ) : (
              <ButtonCustom sx={{}} onClick={() => handleConnect(wallet.adapter)}>
                Connect
              </ButtonCustom>
            );
            break;
        }

        return (
          <Grid component="div" key={wallet.adapter.name + index + status} size={6}>
            <BoxOptionWallet
              key={wallet.adapter.name + index + status}
              name={wallet.adapter.name}
              icon={{
                key: wallet.adapter.name,
                replaceUrl: wallet.adapter.icon,
              }}
              status={status}
              isConnected={wallet.adapter.connected}
              buttonF={button}
            ></BoxOptionWallet>
          </Grid>
        );
      })}
    </Grid>
  );
}
