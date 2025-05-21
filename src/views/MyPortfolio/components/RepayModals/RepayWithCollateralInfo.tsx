import { Stack, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { mapNameToIcon } from 'src/libs/crypto-icons/constants/iconMappings';
import { TokenName } from 'src/libs/crypto-icons/types';
import ModalSettingTrans from './ModalSettingTrans';

const RepayWithCollateralInfo = () => {
  const IconUsdai = mapNameToIcon[TokenName.USDAI];
  const [isOpenSetting, setIsOpenSetting] = useState(false);

  return (
    <Stack direction={'column'} gap={1} borderTop={'1px solid #323326'} pt={2} mt={2}>
      <Stack justifyContent={'space-between'}>
        <Typography variant="body1" sx={{ color: 'info.main' }}>
          Setting Transaction
        </Typography>

        <IconButton sx={{ paddingY: 0 }} onClick={() => setIsOpenSetting(true)}>
          <SettingsIcon />
        </IconButton>
      </Stack>

      <Stack justifyContent={'space-between'}>
        <Typography variant="body1" sx={{ color: 'info.main' }}>
          Input amount
        </Typography>

        <Typography variant="body1" fontWeight={'bold'} sx={{ color: 'info.main' }}>
          100
        </Typography>
      </Stack>

      <Stack justifyContent={'space-between'}>
        <Typography variant="body1" sx={{ color: 'info.main' }}>
          Minimal expected
        </Typography>

        <Typography variant="body1" fontWeight={'bold'} sx={{ color: 'info.main' }}>
          1
        </Typography>
      </Stack>

      <Stack justifyContent={'space-between'}>
        <Typography variant="body1" sx={{ color: 'info.main' }}>
          Price impact
        </Typography>

        <Typography variant="body1" fontWeight={'bold'} sx={{ color: 'info.main' }}>
          0.1%
        </Typography>
      </Stack>

      <Stack justifyContent={'space-between'}>
        <Typography variant="body1" sx={{ color: 'info.main' }}>
          Action
        </Typography>

        <Stack gap={1} alignItems={'center'}>
          <Typography variant="body2" sx={{ color: 'info.main' }}>
            Redeem
          </Typography>
          <IconUsdai />
          <Typography variant="body2" sx={{ color: 'info.main' }}>
            USDAI
          </Typography>
        </Stack>
      </Stack>

      <ModalSettingTrans isOpen={isOpenSetting} onClose={() => setIsOpenSetting(false)} />
    </Stack>
  );
};

export default RepayWithCollateralInfo;
