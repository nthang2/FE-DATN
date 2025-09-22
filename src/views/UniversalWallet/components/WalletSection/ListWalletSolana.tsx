import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Adapter } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { useDebounce } from 'use-debounce';
import { useDestinationWalletState, useSourceWalletState } from '../../state/hooks';

interface IProps {
  onDisconnect: () => void;
  isDestinationWallet?: boolean;
}

const ListWalletSolana = (props: IProps) => {
  const { isDestinationWallet, onDisconnect } = props;
  const { select, wallets, publicKey, wallet } = useWallet();
  const { chainId, disconnect } = useSummarySolanaConnect();
  const [search, setSearch] = useState<string>('');
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();
  const [sourceWallet, setSourceWallet] = useSourceWalletState();
  const [searchDebounce] = useDebounce(search, 200);

  const listConnecter = useMemo(() => {
    return wallets.filter((walletItem) => walletItem.adapter.name.toLowerCase().includes(searchDebounce.toLowerCase()));
  }, [searchDebounce, wallets]);

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
    if (adapter.connected) {
      handleDisconnect();
    } else {
      handleConnect(adapter);
    }
  };

  useEffect(() => {
    if (isDestinationWallet) {
      //Only can do it in here bc we can't access wallet.adapter of destination wallet outside
      if (publicKey?.toString() !== destinationWallet.address) {
        setDestinationWallet({ address: publicKey?.toString() || '', wallet: wallet?.adapter.icon || '', chainId: chainId || '' });
      }
    } else {
      if (publicKey?.toString() !== sourceWallet.address) {
        setSourceWallet({ address: publicKey?.toString() || '', wallet: wallet?.adapter.icon || '', chainId: chainId || '' });
      }
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
        {listConnecter.map((walletItem, index) => {
          return (
            <Stack
              key={walletItem.adapter.name + index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              p={1}
              borderBottom={index !== wallets.length - 1 ? '1px solid #666662' : 0}
            >
              <Box className="flex-start" gap={1}>
                <img src={walletItem.adapter.icon} style={{ width: '20px', height: '20px', borderRadius: '10px' }} />

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {walletItem.adapter.name}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                color={walletItem.adapter.connected ? 'error' : 'primary'}
                onClick={() => handleClickBtn(walletItem.adapter)}
                sx={{ height: '32px' }}
              >
                {walletItem.adapter.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ListWalletSolana;
