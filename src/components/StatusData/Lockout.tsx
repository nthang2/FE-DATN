import React from 'react';
import { BoxCustom } from '../General/CustomBox/CustomBox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Typography } from '@mui/material';
import ConnectWalletSection from 'src/layout/header/ConnectWalletSection';

const Lockout = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <BoxCustom display="flex" flexDirection="column" alignItems="center" gap={6} sx={{ padding: '50px' }}>
        <Box>
          <LockOutlinedIcon sx={{ fontSize: '50px' }} color="primary" />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography textAlign="center" variant="h4">
            You need connect Solana wallet to see this content
          </Typography>
          <ConnectWalletSection />
        </Box>
      </BoxCustom>
    </Container>
  );
};

export default Lockout;
