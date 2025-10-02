import { Box, Button, Stack, Typography } from '@mui/material';
import { Adapter } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { useDestinationWalletState, useSourceWalletState } from 'src/views/UniversalWallet/state/hooks';
import { useDebounce } from 'use-debounce';

interface IProps {
  onDisconnect: () => void;
  isDestinationWallet?: boolean;
}

const SolanaWallet = (props: IProps) => {
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
      return;
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
      <Stack direction="column">
        {listConnecter.map((walletItem, index) => {
          return (
            <Stack
              key={walletItem.adapter.name + index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              borderBottom={index !== wallets.length - 1 ? '0.5px solid #323326' : 0}
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
                sx={{ height: '32px', bgcolor: '#46492F', border: '0px' }}
              >
                <Typography variant="caption2" sx={{ color: '#E2E5C2' }}>
                  {walletItem.adapter.connected ? 'Connected' : 'Connect'}
                </Typography>
              </Button>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default SolanaWallet;
