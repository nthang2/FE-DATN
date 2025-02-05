import { Box, CircularProgress } from '@mui/material';
import React, { Suspense } from 'react';
// import { IconLoading } from 'src/assets/icons/IconLoading';

export default function BoxSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <Box pt={6}>
          <CircularProgress sx={{ fontSize: '100px' }} />
        </Box>
      }
    >
      {children}
    </Suspense>
  );
}
