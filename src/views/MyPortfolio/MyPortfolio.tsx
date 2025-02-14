import { Grid2 } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import Lockout from 'src/components/StatusData/Lockout';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import Borrow from './Borrow';
import Deposit from './Deposit';
import MyWallet from './MyWallet';
import YourPosition from './YourPosition';

export default function MyPortfolio() {
  const { status } = useSummarySolanaConnect();
  const wallet = useWallet();
  return (
    <>
      {status == 'Connected' && (
        <Grid2 container spacing={3} sx={{ mt: 4 }}>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <YourPosition />
            <Deposit />
            <Borrow />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            {/* <HealthFactor /> */}
            <MyWallet />
          </Grid2>
        </Grid2>
      )}

      {!wallet.wallet && <Lockout />}
    </>
  );
}
