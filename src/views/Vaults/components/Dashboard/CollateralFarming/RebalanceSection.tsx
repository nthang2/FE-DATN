import React from 'react';
import RebalanceActionTable from './RebalanceActionTable';
import { Grid2 as Grid } from '@mui/material';

const RebalanceSection = () => {
  return (
    <Grid container spacing={2} width="100%">
      <Grid size={{ xs: 12, md: 12 }}>
        <RebalanceActionTable />
      </Grid>
    </Grid>
  );
};

export default RebalanceSection;
