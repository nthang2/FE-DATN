import { Box, Grid2 } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import Lockout from 'src/components/StatusData/Lockout';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import Borrow from './Borrow';
import Deposit from './Deposit';
import MyWallet from './MyWallet';
import YourPosition from './YourPosition';
import SwitchMode from './components/SwitchMode';
import HealthFactor from './HealthFactor';

export default function MyPortfolio() {
  const { status } = useSummarySolanaConnect();
  const wallet = useWallet();
  return (
    <>
      {status == 'Connected' && (
        <Box sx={{ bgcolor: 'background.selection', padding: '0px 32px 32px 32px', mt: 4, borderRadius: '32px' }}>
          <SwitchMode />
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <YourPosition />
              <Deposit />
              <Borrow />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <HealthFactor />
              <MyWallet />
            </Grid2>
          </Grid2>
        </Box>
      )}

      {!wallet.wallet && <Lockout />}
    </>
  );
}
