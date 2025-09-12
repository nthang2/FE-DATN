import React, { useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import { Stack, Typography } from '@mui/material';
import { listTokenAvailableVault } from '../../constant';
import CustomSelectToken from 'src/views/MyPortfolio/components/InputCustom/CustomSelectToken';
import ToggleButtonGroupCustom from 'src/components/General/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import DestinationsSection from './CollateralFarming/DestinationsSection';
import ProtocolSection from './CollateralFarming/ProtocolSection';
import RebalanceSection from './CollateralFarming/RebalanceSection';

const ToggleButtonGroups = [
  {
    value: 'destinations',
    label: 'Destinations',
  },
  {
    value: 'protocols',
    label: 'Protocols',
  },
  { value: 'rebalance', label: 'Rebalance' },
];

const CollateralFarming = () => {
  const [selectedToken, setSelectedToken] = useState<string>(listTokenAvailableVault['USDC'].address);
  const [toggleValue, setToggleValue] = useState<string>('destinations');

  return (
    <BoxCustom className="flex-start" sx={{ bgcolor: '#000', gap: 1.5, flexDirection: 'column' }}>
      <Stack alignItems="center" justifyContent="space-between" mb={2} width="100%">
        <Typography variant="h6" fontWeight={600}>
          Collateral Farming
        </Typography>

        <CustomSelectToken
          options={[listTokenAvailableVault['USDC']].map((token) => token.address)}
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value as string)}
          sx={{
            py: 3,
            borderRadius: '10px',
            height: '35px',
            padding: 0,
          }}
        />
      </Stack>

      <ToggleButtonGroupCustom
        value={toggleValue}
        handleToggleChange={(_, newAlignment) => setToggleValue(newAlignment)}
        data={ToggleButtonGroups}
        sx={{
          height: '45px',
          borderRadius: '12px',
          width: '100%',
          '& .Mui-selected, && .Mui-selected:hover': {
            borderRadius: '8px !important',
          },
        }}
        toggleBtnProps={{
          sx: {
            width: '100%',
          },
        }}
      />

      {toggleValue === 'destinations' && <DestinationsSection />}
      {toggleValue === 'protocols' && <ProtocolSection />}
      {toggleValue === 'rebalance' && <RebalanceSection />}
    </BoxCustom>
  );
};

export default CollateralFarming;
