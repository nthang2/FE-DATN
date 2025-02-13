import React, { useState } from 'react';
import ToggleButtonGroupCustom from 'src/components/General/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import DepositSection from '../DepositSection/DepositSection';
import WithdrawSection from '../WithdrawSection/WithdrawSection';

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

  const handleToggle = (_e: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setToggleValue(newAlignment);
  };

  return (
    <>
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

      {toggleValue === 'deposit' ? <DepositSection /> : <WithdrawSection />}
    </>
  );
};

export default VaultContent;
