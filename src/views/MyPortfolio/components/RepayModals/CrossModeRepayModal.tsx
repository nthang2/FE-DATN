import { MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';
import RepayModal from '../RepayModal';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TokenName } from 'crypto-token-icon';
import RepayWithCollateral from './RepayWithCollateral';

const options = [
  {
    label: 'Repay with collateral',
    value: 'collateral',
  },
  {
    label: 'Repay with wallet',
    value: 'wallet',
  },
];

const CrossModeRepayModal = () => {
  const [selectedOption, setSelectedOption] = useState<string>('collateral');
  const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];

  return (
    <>
      <Select
        sx={{
          border: '1px solid #666662',
          height: '35px',
          minWidth: '135px',
          padding: '4px 16px',
          borderRadius: '8px',
          mb: 4,
        }}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={{ padding: '4px 16px', height: '35px' }}>
            <Typography variant="body2">{option.label}</Typography>
          </MenuItem>
        ))}
      </Select>

      {selectedOption === 'wallet' && <RepayModal token={usdaiInfo} />}
      {selectedOption === 'collateral' && <RepayWithCollateral />}
    </>
  );
};

export default CrossModeRepayModal;
