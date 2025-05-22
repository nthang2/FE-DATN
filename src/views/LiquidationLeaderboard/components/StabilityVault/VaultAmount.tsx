import { Typography } from '@mui/material';
import { TokenName } from 'src/libs/crypto-icons';
import React from 'react';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { decimalFlood } from 'src/utils/format';

interface IProps {
  amount: number;
}

const VaultAmount = (props: IProps) => {
  const { amount } = props;
  const { data } = useQueryAllTokensPrice();
  const usdaiPrice = amount * Number(data?.[TokenName.USDAI]?.price || 1);

  return (
    <Typography variant="body1" color="primary">
      {amount ? decimalFlood(amount, 3) : 0} USDAI{' '}
      <Typography component="span" variant="body1" color="info.main">
        ${amount ? decimalFlood(usdaiPrice, 3) : 0}
      </Typography>
    </Typography>
  );
};

export default VaultAmount;
