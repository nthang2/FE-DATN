import { Box } from '@mui/material';
import React, { Suspense } from 'react';
import LoadingIcon from 'src/assets/LoadingIcon';

export default function BoxSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <Box pt={6}>
          <LoadingIcon sx={{ width: '100px', height: '100px' }} />
        </Box>
      }
    >
      {children}
    </Suspense>
  );
}
