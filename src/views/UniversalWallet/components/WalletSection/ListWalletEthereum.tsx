import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { walletIcon as walletIconEVM } from 'src/states/wallets/constants/walletIcon';
import { config } from 'src/states/wallets/evm-blockchain/config';
import { useDebounce } from 'use-debounce';
import { Connector, useConnect } from 'wagmi';
import { disconnect, getAccount } from 'wagmi/actions';
import { mapNameWalletIcon } from '../../network';
import { useDestinationWalletState, useSourceWalletState } from '../../state/hooks';

type IProps = {
  onDisconnect: () => void;
  isDestinationWallet?: boolean;
};

const ListWalletEthereum = (props: IProps) => {
  const { isDestinationWallet, onDisconnect } = props;
  const { connectAsync, connectors } = useConnect();
  const { address, chainId, connector: connectorEVM } = getAccount(config);
  const [search, setSearch] = useState<string>('');
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();
  const [sourceWallet, setSourceWallet] = useSourceWalletState();
  const [searchDebounce] = useDebounce(search, 200);
  const walletIcon = connectorEVM ? connectorEVM.icon || walletIconEVM[connectorEVM.name] : undefined;

  const listConnecter = useMemo(() => {
    return connectors.filter((connector) => connector.name.toLowerCase().includes(searchDebounce.toLowerCase()));
  }, [connectors, searchDebounce]);

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
      <Stack justifyContent="space-between" alignItems="center">
        <Typography variant="body1" fontWeight={600}>
          Select a wallet
        </Typography>

        <CustomTextField
          fullWidth
          variant="outlined"
          placeholder="Search wallet"
          InputProps={{
            startAdornment: <SearchIcon sx={{ width: '18px', height: '18px', mr: 1 }} />,
            sx: { borderRadius: '8px', height: '40px' },
          }}
          sx={{ width: '200px', bgcolor: 'secondary.dark', borderRadius: '8px' }}
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        />
      </Stack>

      <Stack direction="column">
        {listConnecter.map((connector, index) => {
          const isConnected = connector.id === connectorEVM?.id;

          return (
            <Stack
              key={connector.id + index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              p={1}
              borderBottom={index !== connectors.length - 1 ? '1px solid #666662' : 0}
            >
              <Box className="flex-start" gap={1}>
                {mapNameWalletIcon[connector.name] || (
                  <img src={connector.icon} style={{ width: '20px', height: '20px', borderRadius: '10px' }} />
                )}

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {connector.name}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                color={isConnected ? 'error' : 'primary'}
                onClick={() => handleClickBtn(connector)}
                sx={{ height: '32px' }}
              >
                {isConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ListWalletEthereum;
