import { Box, Typography } from '@mui/material';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { formatNumber } from 'src/utils/format';

export default function ListTokenAvailable() {
  return (
    <Box>
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: '14px' }}>
        <Typography sx={{ color: 'text.secondary' }}>Total Balance</Typography>
        <Typography sx={{ fontWeight: 700, color: 'white', fontSize: '32px' }}>
          {formatNumber(0, { fractionDigits: 2, prefix: '$' })}
        </Typography>
      </Box>
      <Box sx={{ py: 3 }}>
        <CustomTextField fullWidth placeholder="Search asset" />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Token
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Balance (USD)
        </Typography>
      </Box>
    </Box>
  );
}
