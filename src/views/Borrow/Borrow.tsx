import { Box, Button, Stack, Typography } from '@mui/material';
import BorrowDepositSection from './BorrowDepositSection/BorrowDepositSection';
import LTVSection from './LTVSection/LTVSection';
import BorrowRate from './BorrowRate/BorrowRate';

const Borrow = () => {
  return (
    <Box width="100%" mt={4}>
      <Typography variant="h5" mb={1.5} fontWeight={700}>
        Borrow USDAI
      </Typography>

      <Stack gap={2}>
        <Box>
          <Box
            sx={(theme) => ({
              bgcolor: theme.palette.background.paper,
              p: 1.5,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              borderRadius: 2,
            })}
          >
            <BorrowDepositSection />

            <LTVSection />
          </Box>

          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            Borrow
          </Button>
        </Box>

        <BorrowRate />
      </Stack>
    </Box>
  );
};

export default Borrow;
