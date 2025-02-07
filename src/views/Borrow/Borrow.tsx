import { Box, Button, Stack, Typography } from '@mui/material';
import BorrowRate from './components/BorrowRate/BorrowRate';
import BorrowSection from './components/BorrowDepositSection/BorrowSection';
import DepositSection from './components/BorrowDepositSection/DepositSection';
import LTVSection from './components/LTVSection/LTVSection';
import ActionSection from './components/ActionSection/ActionSection';

const Borrow = () => {
  return (
    <Box width="100%" my={4}>
      <Typography variant="h5" mb={1.5} fontWeight={700}>
        Borrow USDAI
      </Typography>

      <Stack gap={2} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
        <Box flex={1}>
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
            <Stack gap={1.25} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
              <DepositSection />

              <BorrowSection />
            </Stack>

            <LTVSection />
            <ActionSection />
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
