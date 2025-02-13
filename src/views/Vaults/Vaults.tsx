import { Box, Container } from '@mui/material';
import VaultBanner from './components/VaultBanner/VaultBanner';
import VaultContent from './components/VaultContent/VaultContent';

const Vaults = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <VaultBanner />

      <Box
        sx={{
          bgcolor: 'background.content',
          padding: '24px 32px 28px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
          borderRadius: '14px',
        }}
      >
        <VaultContent />
      </Box>
    </Container>
  );
};

export default Vaults;
