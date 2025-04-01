import { Grid2 } from '@mui/material';
import React from 'react';
// import StabilityVault from './components/StabilityVault/StabilityVault';
import LeaderboardTable from './LeaderboardTable';

const LiquidationLeaderboard = () => {
  return (
    <Grid2 container mt={4} spacing={3} flexDirection={{ xs: 'column-reverse', md: 'row' }}>
      <Grid2 size={{ xs: 12, md: 12 }}>
        <LeaderboardTable />
      </Grid2>

      {/* <Grid2 size={{ xs: 12, md: 4 }}>
        <StabilityVault />
      </Grid2> */}
    </Grid2>
  );
};

export default LiquidationLeaderboard;
