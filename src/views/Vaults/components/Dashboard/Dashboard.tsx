import { Grid2 as Grid, Typography } from '@mui/material';
import React from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import EarningRateChart from './Chart/EarningRateChart';
import SystemBackingChart from './Chart/SystemBackingChart';
import SupplyChart from './Chart/SupplyChart';
import CollateralFarming from './CollateralFarming';
import TopDepositors from './TopDepositors';
import Audits from './Audits';

const Dashboard = () => {
  return (
    <BoxCustom mt={3} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" fontWeight={600} mt={1}>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <EarningRateChart />

          <SupplyChart />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SystemBackingChart />
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, md: 12 }}>
        <CollateralFarming />
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TopDepositors />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Audits />
        </Grid>
      </Grid>
    </BoxCustom>
  );
};

export default Dashboard;
