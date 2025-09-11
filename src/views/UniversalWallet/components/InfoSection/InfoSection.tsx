import React, { useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import ToggleButtonGroupCustom from 'src/components/General/ToggleButtonGroupCustom/ToggleButtonGroupCustom';
import ListWallet from './ListWallet';
import TransactionHistory from './TransactionHistory';

const ToggleButtonGroups = [
  {
    value: 'list-wallet',
    label: 'List Wallet',
  },
  {
    value: 'transaction-history',
    label: 'Transaction History',
  },
];

const InfoSection = () => {
  const [toggleValue, setToggleValue] = useState<string>('list-wallet');

  const handleToggle = (_e: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment === null) return;
    setToggleValue(newAlignment);
  };

  return (
    <BoxCustom>
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

      {toggleValue === 'list-wallet' && <ListWallet />}
      {toggleValue === 'transaction-history' && <TransactionHistory />}
    </BoxCustom>
  );
};

export default InfoSection;
