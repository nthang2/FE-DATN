import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useQueryYourBorrow from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryYourBorrow';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';

export default function CheckHealthFactor({ token }: { token: SolanaEcosystemTokenInfo }) {
  const { data: depositValueData } = useQueryDepositValue();
  const { data: yourBorrowData } = useQueryYourBorrow();

  const healthFactor = useMemo(() => {
    if (depositValueData && yourBorrowData) {
      const ratio = BN(yourBorrowData[token.address]).div(BN(depositValueData[token.address])).toString();
      const healthFactor = BN(depositValueData[token.address])
        .times(token.ratio ?? 1)
        .div(yourBorrowData[token.address])
        .toString();
      return { ratio: ratio, healthFactor: healthFactor };
    }
  }, [depositValueData, yourBorrowData, token.address]);

  return (
    <Box className="flex-center">
      <Box sx={{ height: '24px', borderRadius: '99px', bgcolor: '#08DBA4', ml: 4, p: '5px 8px' }} className="flex-center">
        <Typography variant="body3" sx={{ color: 'background.default' }}>
          {healthFactor?.ratio
            ? BN(healthFactor?.ratio).isLessThanOrEqualTo(0.1)
              ? 'Conservative'
              : BN(healthFactor?.ratio).isGreaterThan(0.2)
              ? 'Aggressive'
              : 'Moderate'
            : '--'}
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: 600, ml: 1 }}>{healthFactor ? formatNumber(healthFactor.healthFactor) : '--'}</Typography>
    </Box>
  );
}
