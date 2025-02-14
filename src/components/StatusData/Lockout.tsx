import React from 'react';
import { BoxCustom } from '../General/CustomBox/CustomBox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Container, Typography } from '@mui/material';

const Lockout = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <BoxCustom display="flex" flexDirection="column" alignItems="center" gap={5} sx={{ padding: '50px' }}>
        <Box>
          <LockOutlinedIcon sx={{ fontSize: '50px' }} color="primary" />
        </Box>
        <Typography textAlign="center" variant="h4">
          You need connect wallet to see this content
        </Typography>
      </BoxCustom>
    </Container>
  );
};

export default Lockout;
