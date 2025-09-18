import { Grid2 as Grid } from '@mui/material';
import DestinationsChart from '../Chart/DestinationsChart';
import DestinationsTable from './DestinationsTable';

const DestinationsSection = () => {
  return (
    <Grid container spacing={2} width="100%">
      <Grid size={{ xs: 12, md: 4 }}>
        <DestinationsChart />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <DestinationsTable />
      </Grid>
    </Grid>
  );
};

export default DestinationsSection;
