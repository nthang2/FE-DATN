import { Box, IconButton, Stack, Typography } from '@mui/material';
import SwapForm from './SwapForm';
import { SettingsOutlined } from '@mui/icons-material';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import { useState } from 'react';
import ModalSettingSwap from './ModalSettingSwap';

const SwapToken = () => {
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        height: 'calc(100vh - 115px)',
      }}
    >
      <Stack margin="auto" mt={4} flexDirection="column">
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
            <Typography variant="h5">Swap</Typography>

            <IconButton onClick={() => setIsOpenSetting(true)}>
              <SettingsOutlined sx={{ color: 'info.main' }} />
            </IconButton>
          </Stack>

          <SwapForm />
        </BoxCustom>
      </Stack>
      <ModalSettingSwap isOpen={isOpenSetting} onClose={() => setIsOpenSetting(false)} />
    </Box>
  );
};

export default SwapToken;
