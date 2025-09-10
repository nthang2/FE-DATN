import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { Connector, useAccount, useConnect } from 'wagmi';
import { useDestinationWalletState } from '../../state/hooks';
import { mapNameWalletIcon } from '../../network';
import useSummaryEVMConnect from 'src/states/wallets/evm-blockchain/hooks/useSummaryEVMConnect';

const ListWalletEthereum = () => {
  const { address } = useSummaryEVMConnect();
  const { connector: connectorEVM } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const [search, setSearch] = useState<string>('');
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();

  async function handleConnect(connector: Connector) {
    try {
      await connectAsync({ connector: connector });
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }

  useEffect(() => {
    if (address && address?.toString() !== destinationWallet.address) {
      setDestinationWallet({
        address: address?.toString() || '',
        wallet: connectorEVM?.icon || '',
        iconWalletName: connectorEVM?.name || undefined,
      });
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
        {connectors.map((connector, index) => {
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

              <Button variant="outlined" disabled={isConnected} onClick={() => handleConnect(connector)} sx={{ height: '32px' }}>
                {isConnected ? 'Connected' : 'Connect'}
              </Button>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ListWalletEthereum;
