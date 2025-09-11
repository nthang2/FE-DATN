import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Adapter } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { useDestinationWalletState, useSourceWalletState } from '../../state/hooks';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';

interface IProps {
  onDisconnect: () => void;
}

const ListWalletSolana = (props: IProps) => {
  const { onDisconnect } = props;
  const { select, wallets, publicKey, wallet } = useWallet();
  const { chainId, disconnect, status } = useSummarySolanaConnect();
  const [search, setSearch] = useState<string>('');
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();
  const [sourceWallet] = useSourceWalletState();

  async function handleConnect(adapter: Adapter) {
    try {
      select(adapter.name);
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }

  const handleDisconnect = () => {
    disconnect();
    onDisconnect();
  };

  const handleClickBtn = (adapter: Adapter) => {
    if (status === 'Connected') {
      handleDisconnect();
    } else {
      handleConnect(adapter);
    }
  };

  useEffect(() => {
    if (sourceWallet === publicKey?.toString()) {
      setDestinationWallet({ address: '', wallet: '', chainId: '' });
      return;
    }
    //Only can do it in here bc we can't access wallet.adapter of destination wallet outside
    if (publicKey && publicKey?.toString() !== destinationWallet.address) {
      setDestinationWallet({ address: publicKey?.toString() || '', wallet: wallet?.adapter.icon || '', chainId: chainId || '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, sourceWallet]);

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
                color={wallet.adapter.connected ? 'error' : 'primary'}
                onClick={() => handleClickBtn(wallet.adapter)}
                sx={{ height: '32px' }}
              >
                {wallet.adapter.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ListWalletSolana;
