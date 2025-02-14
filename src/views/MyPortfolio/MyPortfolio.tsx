import { Grid2 } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import Lockout from 'src/components/StatusData/Lockout';
import Borrow from './Borrow';
import Deposit from './Deposit';
import MyWallet from './MyWallet';
import YourPosition from './YourPosition';

export default function MyPortfolio() {
  const { connected } = useWallet();
  return connected ? (
    <Grid2 container spacing={3} sx={{ mt: 4 }}>
      <Grid2 size={8}>
        <YourPosition />
        <Deposit />
        <Borrow />
      </Grid2>
      <Grid2 size={4}>
        {/* <HealthFactor /> */}
        <MyWallet />
      </Grid2>
    </Grid2>
  ) : (
    <Lockout />
  );
}
