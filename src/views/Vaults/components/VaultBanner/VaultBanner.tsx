import { Box, Button, Stack, Typography } from '@mui/material';

const VaultBanner = () => {
  return (
    <Stack
      sx={{
        borderRadius: '14px',
        background: 'linear-gradient(0deg, #F2F9A5 0%, #FEFFF3 100%)',
        color: '#000',
        height: 'fit-content',
        padding: '36px 32px 24px 32px',
        justifyContent: 'space-between',
        mb: 2,
      }}
    >
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <Typography variant="h6" fontWeight={600}>
          Staked Amount
        </Typography>
        <Typography variant="h2" fontWeight={700} fontSize="42px">
          $0.293
        </Typography>
        <Typography variant="body2">596.15 USDAI</Typography>
      </Box>

      <Box display={'flex'} flexDirection={'column'} gap={1}>
        <Typography variant="h6" fontWeight={600}>
          Claimable Rewards
        </Typography>
        <Typography variant="h2" fontWeight={700} fontSize="42px">
          $-
        </Typography>
        <Typography variant="body2">0 Asset</Typography>
      </Box>

      <Button
        variant="contained"
        sx={{
          color: 'primary.main',
          bgcolor: '#1B1C14',
          boxShadow: 'none',
          my: 'auto',
          ':hover': {
            bgcolor: '#1B1C14',
            boxShadow: 'none',
          },
        }}
      >
        Claim Rewards
      </Button>
    </Stack>
  );
};

export default VaultBanner;
