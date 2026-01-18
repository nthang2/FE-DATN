import { Box, Button, Stack, Typography } from '@mui/material';
import { Adapter } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { useDestinationWalletState, useSourceWalletState } from 'src/views/UniversalWallet/state/hooks';
import { useDebounce } from 'use-debounce';

interface IProps {
  onDisconnect: () => void;
  isDestinationWallet?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SolanaWallet = (props: IProps) => {
  const { select, wallets, publicKey } = useWallet();
  const { chainId } = useSummarySolanaConnect();
  const [search] = useState<string>('');
  const [destinationWallet, setDestinationWallet] = useDestinationWalletState();
  const [sourceWallet, setSourceWallet] = useSourceWalletState();
  const [searchDebounce] = useDebounce(search, 200);

  const listConnecter = useMemo(() => {
    return wallets.filter((walletItem) => walletItem.adapter.name.toLowerCase().includes(searchDebounce.toLowerCase()));
  }, [searchDebounce, wallets]);

  async function handleConnect(adapter: Adapter) {
    try {
      select(adapter.name);
      if (publicKey?.toString() !== sourceWallet.address) {
        setSourceWallet({ address: publicKey?.toString() || '', wallet: adapter.icon || '', chainId: chainId || '' });
      } else if (publicKey?.toString() !== destinationWallet.address) {
        setDestinationWallet({ address: publicKey?.toString() || '', wallet: adapter.icon || '', chainId: chainId || '' });
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }

  const handleClickBtn = (adapter: Adapter) => {
    if (adapter.connected) {
      return;
    } else {
      handleConnect(adapter);
    }
  };

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
                sx={{
                  height: '32px',
                  bgcolor: walletItem.adapter.connected ? '#FFFFFF' : 'rgba(255, 182, 217, 1)',
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
                    bgcolor: walletItem.adapter.connected ? '#FFFFFF' : 'rgba(255, 159, 204, 1)',
                    transform: 'translateY(-2px)',
                    boxShadow: walletItem.adapter.connected ? '0 6px 20px rgba(255, 182, 217, 0.3)' : '0 6px 20px rgba(255, 182, 217, 0.4)',
                    '&::before': {
                      width: walletItem.adapter.connected ? '0' : '200px',
                      height: walletItem.adapter.connected ? '0' : '200px',
                    },
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                }}
              >
                <Typography variant="caption2" sx={{ color: walletItem.adapter.connected ? 'rgba(255, 182, 217, 1)' : '#000', position: 'relative', zIndex: 1 }}>
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
