import { Box, Grid2, Stack } from '@mui/material';
import ActionSection from './components/ActionSection/ActionSection';
import BorrowButton from './components/BorrowButton/BorrowButton';
import BorrowSection from './components/BorrowDepositSection/BorrowSection';
import DepositSection from './components/BorrowDepositSection/DepositSection';
// import BorrowRate from './components/BorrowRate/BorrowRate';
// import HealthFactor from './components/HealthFactor/HealthFactor';
import BorrowRate from './components/BorrowRate/BorrowRate';
import HealthFactor from './components/HealthFactor/HealthFactor';
import LTVSection from './components/LTVSection/LTVSection';
import MintBanner from './components/MintBanner/MintBanner';
import { useBorrowCrossSubmitState } from './state/hooks';

const BorrowCrossChain = () => {
  const [isSubmitted] = useBorrowCrossSubmitState();

  return (
    <Box width="100%" mt={4}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 9 }}>
          <MintBanner />
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
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <BorrowRate />
            <HealthFactor />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default BorrowCrossChain;
