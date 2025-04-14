import { Stack, Typography } from '@mui/material';
import React from 'react';
import { listTokenAvailable, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import RepayCustomInput from '../InputCustom/RepayCustomInput';
import { mapNameToIcon, TokenName } from 'crypto-token-icon';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';

const RepayWithCollateral = () => {
  const [selectToken, setSelectToken] = React.useState(Object.values(listTokenAvailable)[0].address);
  const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
  const IconUsdai = mapNameToIcon[TokenName.USDAI];

  return (
    <Stack direction={'column'} gap={4}>
      <Stack direction={'column'} gap={0.5}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="body2" sx={{ color: '#888880' }}>
            Your Repay:
          </Typography>

          <Typography variant="body2" sx={{ color: '#888880' }}>
            Repayable amount: 0.5
          </Typography>
        </Stack>

        <RepayCustomInput
          selectProps={{
            value: usdaiInfo.address,
            disabled: true,
          }}
          selectOptions={[usdaiInfo.address]}
        />
      </Stack>

      <Stack direction={'column'} gap={0.5}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="body2" sx={{ color: '#888880' }}>
            Repay with:
          </Typography>

          <Typography variant="body2" sx={{ color: '#888880' }}>
            Available: 0.0877
          </Typography>
        </Stack>

        <RepayCustomInput
          selectProps={{
            value: selectToken,
            onChange: (e) => setSelectToken(e.target.value),
          }}
        />
      </Stack>

      <Stack justifyContent={'space-between'} borderTop={'1px solid #323326'} borderBottom={'1px solid #323326'} paddingY={2}>
        <Typography variant="body1" sx={{ color: '#888880' }}>
          Action
        </Typography>

        <Stack gap={1} alignItems={'center'}>
          <Typography variant="body2" sx={{ color: '#888880' }}>
            Redeem
          </Typography>
          <IconUsdai />
          <Typography variant="body2" sx={{ color: '#888880' }}>
            USDAI
          </Typography>
        </Stack>
      </Stack>

      <ButtonLoading variant="contained">Redeem</ButtonLoading>
    </Stack>
  );
};

export default RepayWithCollateral;
