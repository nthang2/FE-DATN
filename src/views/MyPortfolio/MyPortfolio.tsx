import { Grid2 } from '@mui/material';
import Borrow from './Borrow';
import Deposit from './Deposit';
import MyWallet from './MyWallet';
import YourPosition from './YourPosition';

export default function MyPortfolio() {
  return (
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
  );
}
