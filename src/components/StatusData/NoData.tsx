import { Box, Typography } from '@mui/material';
import { MetroChartBarIcon } from 'src/assets/icons';

export default function NoData({ color = '#B5B8B8', text = 'No Data' }: { color?: string; text?: string }) {
  return (
    <Box sx={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <MetroChartBarIcon sx={{ fontSize: '2.5rem', color: color, mb: 0.5 }} />
      <Typography color={color}>{text}</Typography>
    </Box>
  );
}
