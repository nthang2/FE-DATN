import { Grid2 as Grid } from '@mui/material';
import ProtocolChart from '../Chart/ProtocolChart';
import ProtocolTable from './ProtocolTable';

const ProtocolSection = () => {
  return (
    <Grid container spacing={2} width="100%">
      <Grid size={{ xs: 12, md: 4 }}>
        <ProtocolChart />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <ProtocolTable />
      </Grid>
    </Grid>
  );
};

export default ProtocolSection;
