import { Box, Typography, Stack, Button } from '@mui/material';
import { Adapter } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const ListWalletSolana = () => {
  const { select, wallets } = useWallet();
  const [search, setSearch] = useState<string>('');

  async function handleConnect(adapter: Adapter) {
    try {
      select(adapter.name);
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }

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

              <Button variant="outlined" onClick={() => handleConnect(wallet.adapter)} sx={{ height: '32px' }}>
                Connect
              </Button>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ListWalletSolana;
