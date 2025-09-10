import React, { useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import { Grid2 as Grid, Stack, Typography } from '@mui/material';
import { listTokenAvailableVault } from '../../constant';
import CustomSelectToken from 'src/views/MyPortfolio/components/InputCustom/CustomSelectToken';
import ToggleButtonGroupCustom from 'src/components/General/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import CollateralFarmingChart from './Chart/CollateralFarmingChart';
import CollateralTable from './CollateralTable';

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
          options={Object.values(listTokenAvailableVault).map((token) => token.address)}
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

      <Grid container spacing={2} width="100%">
        <Grid size={{ xs: 12, md: 4 }}>
          <CollateralFarmingChart />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CollateralTable />
        </Grid>
      </Grid>
    </BoxCustom>
  );
};

export default CollateralFarming;
