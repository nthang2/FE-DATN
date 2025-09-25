import { Grid2 as Grid } from '@mui/material';
import InfoSection from './components/InfoSection/InfoSection';
import WalletSection from './components/WalletSection/WalletSection';

const UniversalWallet = () => {
  return (
    <Grid container spacing={2} mt={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <WalletSection />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <InfoSection />
      </Grid>
    </Grid>
  );
};

export default UniversalWallet;
