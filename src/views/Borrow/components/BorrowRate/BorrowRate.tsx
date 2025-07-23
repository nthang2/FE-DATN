import { Box, Typography } from '@mui/material';
// import useBorrowRate from '../../../../hooks/useQueryHook/queryBorrow/useBorrowRate';
// import { roundNumber } from 'src/utils/format';

const BorrowRate = () => {
  // const { borrowRate } = useBorrowRate();

  return (
    <Box
      sx={{
        borderRadius: '14px',
        background: '#2A2A2A',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        height: 'fit-content',
        padding: '36px 20px 24px 20px',
        maxHeight: '152px',
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        Borrow Rate
      </Typography>
      <Typography variant="h2" fontWeight={700}>
        {/* {roundNumber(borrowRate || 3, 2)}% */}
        3%
      </Typography>

      {/* <Typography variant="body2">Borrow USDAI from jpow.ai for the best rates</Typography> */}
    </Box>
  );
};

export default BorrowRate;
