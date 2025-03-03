import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useMyPortfolioInfo from 'src/hooks/useQueryHook/queryMyPortfolio/useMyPortfolio';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';

export default function CheckHealthFactor({ token }: { token: SolanaEcosystemTokenInfo }) {
  const { asset } = useMyPortfolioInfo();

  const healthFactor = useMemo(() => {
    if (!asset) return {};
    const assetHealFactor = asset[token.address].healthFactor;
    return { healthFactor: BN(assetHealFactor).isGreaterThan(100) ? '100' : assetHealFactor.toString() };
  }, [asset, token.address]);

  const checkRank = () => {
    if (healthFactor) {
      if (healthFactor.healthFactor == 'Infinity') {
        return { rank: 'Healthy', color: 'green' };
      } else if (BN(healthFactor?.healthFactor).isLessThanOrEqualTo(1.2)) {
        return { rank: 'Critical', color: 'red' };
      } else if (BN(healthFactor?.healthFactor).isLessThanOrEqualTo(1.5)) {
        return { rank: 'Risky', color: 'orange' };
      } else if (BN(healthFactor?.healthFactor).isLessThanOrEqualTo(2)) {
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
      <Typography sx={{ fontWeight: 600, ml: 1 }}>
        {healthFactor
          ? formatNumber(healthFactor.healthFactor, {
              fractionDigits: 2,
              suffix: BN(healthFactor.healthFactor).isGreaterThanOrEqualTo(100) ? '+' : '',
            })
          : '--'}
      </Typography>
    </Box>
  );
}
