import { Box, Typography } from '@mui/material';
import { NoDataIcon } from 'src/assets/NoDataIcon';

export default function NoData({ color = '#B5B8B8', text = 'No Data' }: { color?: string; text?: string }) {
  return (
    <Box sx={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <NoDataIcon sx={{ fontSize: '4.5rem', color: color, mb: 1, mt: 2.5 }} />
      <Typography color={color}>{text}</Typography>
    </Box>
  );
}
