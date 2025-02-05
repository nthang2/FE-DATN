import { Box, Typography } from '@mui/material';

const BorrowRate = () => {
  return (
    <Box
      sx={{
        borderRadius: '14px',
        background: 'linear-gradient(0deg, #F2F9A5 0%, #FEFFF3 100%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        color: '#000',
        minWidth: '332px',
        height: 'fit-content',
        padding: '36px 20px 24px 20px',
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        Borrow Rate
      </Typography>
      <Typography variant="h2" fontWeight={700}>
        8%
      </Typography>

      <Typography variant="body2">Borrow USDAI from jpow.ai for the best rates</Typography>
    </Box>
  );
};

export default BorrowRate;
