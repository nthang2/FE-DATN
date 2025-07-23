import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import ModalSettingSwap from './ModalSettingSwap';
import SwapForm from './SwapForm';

const SwapToken = () => {
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 115px)',
      }}
    >
      <Stack margin="auto" mt={3} flexDirection="column">
        <BoxCustom
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 3,
            borderRadius: '10px',
            maxWidth: '550px',
            padding: 3.5,
          }}
        >
          <Stack justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant="h5">Convert</Typography>
          </Stack>

          <SwapForm />
        </BoxCustom>
      </Stack>
      <ModalSettingSwap isOpen={isOpenSetting} onClose={() => setIsOpenSetting(false)} />
    </Box>
  );
};

export default SwapToken;
