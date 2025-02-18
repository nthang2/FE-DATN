import { Box, Stack } from '@mui/material';
import ActionSection from './components/ActionSection/ActionSection';
import BorrowButton from './components/BorrowButton/BorrowButton';
import BorrowSection from './components/BorrowDepositSection/BorrowSection';
import DepositSection from './components/BorrowDepositSection/DepositSection';
import LTVSection from './components/LTVSection/LTVSection';
import MintBanner from './components/MintBanner/MintBanner';
import { useBorrowSubmitState } from './state/hooks';

const Borrow = () => {
  const [isSubmitted] = useBorrowSubmitState();

  return (
    <Box width="100%" my={4}>
      <MintBanner />

      <Stack gap={2} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
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

        {/* <Box display="flex" flexDirection="column" gap={2}>
          <BorrowRate />
        </Box> */}
      </Stack>
    </Box>
  );
};

export default Borrow;
