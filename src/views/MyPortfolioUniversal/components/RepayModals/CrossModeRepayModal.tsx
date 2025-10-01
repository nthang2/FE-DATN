import { Fade, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import RepayModal from '../RepayModal';
import RepayWithCollateral from './RepayWithCollateral';
import { useCrossModeState } from 'src/states/hooks';
import useQueryRedeemConfig from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryRedeemConfig';

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
  const { data: redeemConfig } = useQueryRedeemConfig(token.address);

  const hasAvailableCollateral =
    !crossMode || (redeemConfig?.loan?.listAvailableCollateral && redeemConfig.loan.listAvailableCollateral.length > 0);

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
          display: hasAvailableCollateral ? 'inline-flex' : 'none',
        }}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={{ padding: '4px 16px', height: '35px' }}>
            <Typography variant="body2" lineHeight={'unset'}>
              {option.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>

      <Fade in={selectedOption === 'wallet'} hidden={selectedOption !== 'wallet'} timeout={500}>
        <div>
          <RepayModal token={token} />
        </div>
      </Fade>

      <Fade in={selectedOption === 'collateral'} hidden={selectedOption !== 'collateral'} timeout={500}>
        <div>
          <RepayWithCollateral token={crossMode ? undefined : token} />
        </div>
      </Fade>
    </>
  );
};

export default CrossModeRepayModal;
