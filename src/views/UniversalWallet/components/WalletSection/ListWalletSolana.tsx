import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Adapter } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { useDestinationWalletState } from '../../state/hooks';

const ListWalletSolana = () => {
  const { select, wallets, publicKey, wallet } = useWallet();
  const [search, setSearch] = useState<string>('');
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();

  async function handleConnect(adapter: Adapter) {
    try {
      select(adapter.name);
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }

  useEffect(() => {
    if (publicKey && publicKey?.toString() !== destinationWallet.address) {
      setDestinationWallet({ address: publicKey?.toString() || '', wallet: wallet?.adapter.icon || '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

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
        {wallets.map((wallet, index) => {
          return (
            <Stack
              key={wallet.adapter.name + index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              p={1}
              borderBottom={index !== wallets.length - 1 ? '1px solid #666662' : 0}
            >
              <Box className="flex-start" gap={1}>
                <img src={wallet.adapter.icon} style={{ width: '20px', height: '20px', borderRadius: '10px' }} />

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {wallet.adapter.name}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                disabled={wallet.adapter.connected}
                onClick={() => handleConnect(wallet.adapter)}
                sx={{ height: '32px' }}
              >
                {wallet.adapter.connected ? 'Connected' : 'Connect'}
              </Button>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ListWalletSolana;
