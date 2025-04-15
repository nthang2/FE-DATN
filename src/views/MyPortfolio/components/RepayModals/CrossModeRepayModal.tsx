import { MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import RepayModal from '../RepayModal';
import RepayWithCollateral from './RepayWithCollateral';
import { useCrossModeState } from 'src/states/hooks';

const options = [
  {
    label: 'Repay with wallet',
    value: 'wallet',
  },
  {
    label: 'Repay with collateral',
    value: 'collateral',
  },
];

interface IProps {
  token: SolanaEcosystemTokenInfo;
}

const CrossModeRepayModal = (props: IProps) => {
  const { token } = props;
  const [crossMode] = useCrossModeState();
  const [selectedOption, setSelectedOption] = useState<string>('wallet');

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

      {selectedOption === 'wallet' && <RepayModal token={token} />}
      {selectedOption === 'collateral' && <RepayWithCollateral token={crossMode ? undefined : token} />}
    </>
  );
};

export default CrossModeRepayModal;
