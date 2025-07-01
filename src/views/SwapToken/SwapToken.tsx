import { Box, Stack } from '@mui/material';
import SwapForm from './SwapForm';

const SwapToken = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 115px)',
      }}
    >
      <Stack margin="auto" mt={4} flexDirection="column">
        <SwapForm />
      </Stack>
    </Box>
  );
};

export default SwapToken;
