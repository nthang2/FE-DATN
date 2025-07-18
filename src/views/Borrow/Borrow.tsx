import { Box, Grid2, Stack } from '@mui/material';
import ActionSection from './components/ActionSection/ActionSection';
import BorrowButton from './components/BorrowButton/BorrowButton';
import BorrowSection from './components/BorrowDepositSection/BorrowSection';
import DepositSection from './components/BorrowDepositSection/DepositSection';
// import BorrowRate from './components/BorrowRate/BorrowRate';
// import HealthFactor from './components/HealthFactor/HealthFactor';
import LTVSection from './components/LTVSection/LTVSection';
import MintBanner from './components/MintBanner/MintBanner';
import { useBorrowSubmitState } from './state/hooks';
import HealthFactor from './components/HealthFactor/HealthFactor';

const Borrow = () => {
  const [isSubmitted] = useBorrowSubmitState();

  return (
    <Box width="100%" mt={4}>
      <MintBanner />
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12 }}>
          <Box flex={1} alignItems="center">
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
              {isSubmitted && <ActionSection />}
            </Box>
            <BorrowButton />
          </Box>
        </Grid2>
        {/* <Grid2 size={{ xs: 12, md: 4 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <HealthFactor />
              <BorrowRate />
            </Box>
          </Grid2> */}
      </Grid2>
      <Box display="flex" justifyContent="center" mt={2}>
        <HealthFactor healthFactor={'3'} />
      </Box>
    </Box>
  );
};

export default Borrow;
