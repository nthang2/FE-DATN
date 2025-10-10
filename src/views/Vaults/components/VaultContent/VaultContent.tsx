import React, { useState } from 'react';
import ToggleButtonGroupCustom from 'src/components/General/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import DepositSection from '../DepositSection/DepositSection';
import WithdrawSection from '../WithdrawSection/WithdrawSection';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { mapNameNetwork } from 'src/constants/network';
import DepositSectionEVM from '../DepositSection/DepositSectionEVM';
import { useVaultSelectedNetwork } from '../../state/hooks';
import WithdrawSectionEVM from '../WithdrawSection/WithdrawSectionEVM';

const ToggleButtonGroups = [
  {
    value: 'deposit',
    label: 'Deposit',
  },
  {
    value: 'withdraw',
    label: 'Withdraw',
  },
];

const VaultContent = () => {
  const [toggleValue, setToggleValue] = useState<string>('deposit');
  const [selectedNetwork, setSelectedNetwork] = useVaultSelectedNetwork();

  const handleToggle = (_e: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment === null) return;
    setSelectedNetwork(mapNameNetwork.solana.id);
    setToggleValue(newAlignment);
  };

  const handleChangeNetwork = (value: string) => {
    setSelectedNetwork(value);
  };

  const depositComponent = selectedNetwork === mapNameNetwork.solana.id ? <DepositSection /> : <DepositSectionEVM />;
  const withdrawComponent = selectedNetwork === mapNameNetwork.solana.id ? <WithdrawSection /> : <WithdrawSectionEVM />;

  return (
    <Box>
      <ToggleButtonGroupCustom
        data={ToggleButtonGroups}
        value={toggleValue}
        handleToggleChange={handleToggle}
        fullWidth
        sx={{
          '& .MuiButtonBase-root': {
            padding: '10px 16px',
          },
        }}
      />

      <Select
        value={selectedNetwork}
        onChange={(e) => handleChangeNetwork(e.target.value)}
        sx={{
          mt: 2,
          mb: 2,
          borderRadius: '8px',
          bgcolor: 'transparent',
          border: '1px solid',
          borderColor: 'primary.main',
          textAlign: 'center',
          color: 'primary.main',
        }}
        fullWidth
      >
        {Object.values(mapNameNetwork).map((network) => (
          <MenuItem key={network.id} value={network.id} sx={{ px: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>{network.icon}</Box>
              <Typography>{network.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>

      {toggleValue === 'deposit' && depositComponent}
      {toggleValue === 'withdraw' && withdrawComponent}
    </Box>
  );
};

export default VaultContent;
