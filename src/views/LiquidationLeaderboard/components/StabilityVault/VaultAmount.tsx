import { Typography } from '@mui/material';
import { TokenName } from 'crypto-token-icon';
import React from 'react';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';

interface IProps {
  amount: number;
}

const VaultAmount = (props: IProps) => {
  const { amount } = props;
  const { data } = useQueryAllTokensPrice();
  const usdaiPrice = amount * Number(data?.[TokenName.USDAI]?.price || 1);

  return (
    <Typography variant="body1" color="primary">
      {amount.toFixed(3)} USDAI{' '}
      <Typography component="span" variant="body1" color="info.main">
        ${usdaiPrice.toFixed(3)}
      </Typography>
    </Typography>
  );
};

export default VaultAmount;
