import { Box, Typography } from '@mui/material';
// import useBorrowRate from '../../../../hooks/useQueryHook/queryBorrow/useBorrowRate';
// import { roundNumber } from 'src/utils/format';

const BorrowRate = () => {
  // const { borrowRate } = useBorrowRate();

  return (
    <Box
      sx={{
        borderRadius: '14px',
        background: '#1A1E2E',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        height: 'fit-content',
        padding: '36px 20px 24px 20px',
        maxHeight: '152px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 182, 217, 0.1), transparent)',
          animation: 'shimmer 3s infinite',
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(255, 182, 217, 0.3)',
        },
        '@keyframes shimmer': {
          '0%': {
            left: '-100%',
          },
          '100%': {
            left: '100%',
          },
        },
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        Borrow Rate
      </Typography>
      <Typography variant="h2" fontWeight={700}>
        {/* {roundNumber(borrowRate || 3, 2)}% */}
        0%
      </Typography>

      {/* <Typography variant="body2">Borrow USDAI from jpow.ai for the best rates</Typography> */}
    </Box>
  );
};

export default BorrowRate;
