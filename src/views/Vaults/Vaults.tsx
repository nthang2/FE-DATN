import { Box, Stack } from '@mui/material';
import ClaimableReward from './components/ClaimableReward';
import StakedAmount from './components/StakedAmount';
import VaultBanner from './components/VaultBanner/VaultBanner';
import VaultContent from './components/VaultContent/VaultContent';

const Vaults = () => {
  return (
    <Stack sx={{ mt: 4, mx: 'auto', gap: 1.75, flexDirection: { xs: 'column-reverse', md: 'row' } }}>
      <Box flex={1}>
        <VaultBanner />

        <Box
          sx={{
            bgcolor: 'background.content',
            padding: '24px 32px 28px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            borderRadius: '14px',
            m: 'auto',
          }}
        >
          <VaultContent />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StakedAmount />
        <ClaimableReward />
      </Box>
    </Stack>
  );
};

export default Vaults;
