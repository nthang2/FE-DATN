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
  }, [depositValueData, yourBorrowData, token.address, token.ratio]);

  const checkRank = () => {
    if (healthFactor) {
      if (BN(healthFactor?.ratio).isLessThanOrEqualTo(1.2)) {
        return { rank: 'Critical', color: 'red' };
      } else if (BN(healthFactor?.ratio).isLessThanOrEqualTo(1.5)) {
        return { rank: 'Risky', color: 'orange' };
      } else if (BN(healthFactor?.ratio).isLessThanOrEqualTo(2)) {
        return { rank: 'Moderate', color: 'yellow' };
      } else {
        return { rank: 'Healthy', color: 'green' };
      }
    } else {
      return { rank: '--', color: 'text.primary' };
    }
  };

  return (
    <Box className="flex-center">
      <Box sx={{ height: '24px', borderRadius: '99px', ml: 4, p: '5px 8px', bgcolor: checkRank().color }} className="flex-center">
        <Typography variant="body3" sx={{ color: 'background.default' }}>
          {checkRank().rank}
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: 600, ml: 1 }}>{healthFactor ? formatNumber(healthFactor.healthFactor) : '--'}</Typography>
    </Box>
  );
}
