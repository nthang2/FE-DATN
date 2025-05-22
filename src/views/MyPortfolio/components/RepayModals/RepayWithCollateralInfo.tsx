import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { mapNameToIcon } from 'src/libs/crypto-icons/constants/iconMappings';
import { TokenName } from 'src/libs/crypto-icons/types';
import ModalSettingTrans from './ModalSettingTrans';
import { useSlippageToleranceState } from '../../state/hooks';
import { BN } from 'src/utils';

interface IProps {
  priceImpact?: string;
  minExpected?: string;
}

const RepayWithCollateralInfo = (props: IProps) => {
  const { priceImpact, minExpected } = props;
  const IconUsdai = mapNameToIcon[TokenName.USDAI];
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [slippageTolerance] = useSlippageToleranceState();

  return (
    <Stack direction={'column'} gap={1} borderTop={'1px solid #323326'} pt={2} mt={2}>
      <Stack justifyContent={'space-between'}>
        <Typography variant="body1" sx={{ color: 'info.main' }}>
          Slippage:
        </Typography>

        <Stack direction={'row'} gap={1} alignItems={'center'}>
          <Typography variant="body2" sx={{ color: 'info.main' }}>
            {slippageTolerance}%
          </Typography>
          <SettingsOutlined onClick={() => setIsOpenSetting(true)} sx={{ cursor: 'pointer', color: 'info.light', fontSize: '18px' }} />
        </Stack>
      </Stack>

      <Stack justifyContent={'space-between'}>
        <Typography variant="body1" sx={{ color: 'info.main' }}>
          Price impact
        </Typography>

        <Typography variant="body1" fontWeight={'bold'} sx={{ color: 'info.main' }}>
          {(Number(priceImpact || 0) * 100).toFixed(2)}%
        </Typography>
      </Stack>

      <Stack justifyContent={'space-between'}>
        <Typography variant="body1" sx={{ color: 'info.main' }}>
          Minimum received
        </Typography>

        <Typography variant="body1" fontWeight={'bold'} sx={{ color: 'info.main' }}>
          {BN(minExpected || 0)
            .dividedBy(10 ** 6)
            .toFixed(2)}
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
