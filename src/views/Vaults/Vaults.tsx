import { Box } from '@mui/material';
import VaultBanner from './components/VaultBanner/VaultBanner';
import VaultContent from './components/VaultContent/VaultContent';
import { useWallet } from '@solana/wallet-adapter-react';
import Lockout from 'src/components/StatusData/Lockout';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';

const Vaults = () => {
  const { wallet } = useWallet();
  const { status } = useSummarySolanaConnect();

  if (!wallet) {
    return <Lockout />;
  }

  return (
    status == 'Connected' && (
      <Box sx={{ mt: 4, maxWidth: '900px', mx: 'auto' }}>
        <VaultBanner />

        <Box
          sx={{
            bgcolor: 'background.content',
            padding: '24px 32px 28px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            borderRadius: '14px',
            m: 'auto',
          }}
        >
          <VaultContent />
        </Box>
      </Box>
    )
  );
};

export default Vaults;
