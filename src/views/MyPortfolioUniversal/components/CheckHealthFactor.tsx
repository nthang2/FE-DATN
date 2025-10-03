import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { EthereumChainTokenInfo } from 'src/constants/tokens/evm-ecosystem/list-tokens/ethereum/EthereumChainTokenInfo';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useHealthFactorUniversal from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useHealthFactorUniversal';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';

interface IProps {
  token: SolanaEcosystemTokenInfo | EthereumChainTokenInfo;
  mintAmount: string;
  depositAmount: string;
}

export default function CheckHealthFactor({ token, mintAmount, depositAmount }: IProps) {
  const { data: healthFactorData, status: healthFactorStatus } = useHealthFactorUniversal({
    depositItems: [{ address: token.address, value: depositAmount }],
    mintAmount: Number(mintAmount),
  });

  const { healthFactor } = useMemo(() => {
    if (!healthFactorData) return { healthFactor: '0' };
    if (BN(healthFactorData.healthFactor).isGreaterThan(15)) {
      return { healthFactor: '15' };
    }
    return { healthFactor: healthFactorData.healthFactor };
  }, [healthFactorData]);

  const checkRank = () => {
    if (healthFactor) {
      if (BN(healthFactor).isLessThanOrEqualTo(0)) {
        return { rank: 'Healthy', color: '#34D564' };
      } else if (BN(healthFactor).isLessThanOrEqualTo(1.6)) {
        return { rank: 'Critical', color: '#E9321A' };
      } else if (BN(healthFactor).isLessThanOrEqualTo(2.5)) {
        return { rank: 'Risky', color: '#FF8B3E' };
      } else if (BN(healthFactor).isLessThanOrEqualTo(3.2)) {
        return { rank: 'Moderate', color: '#FFC95D' };
      } else {
        return { rank: 'Healthy', color: '#08DBA4' };
      }
    } else {
      return { rank: 'Healthy', color: '#08DBA4' };
    }
  };

  return (
    <Box className="flex-center">
      <ValueWithStatus
        status={[healthFactorStatus]}
        skeletonStyle={{ ml: 1, height: '30px' }}
        value={
          <Box sx={{ height: '24px', borderRadius: '99px', ml: 4, p: '5px 8px', bgcolor: checkRank().color }} className="flex-center">
            <Typography variant="body3" sx={{ color: 'background.default' }}>
              {checkRank().rank}
            </Typography>
          </Box>
        }
      />

      <ValueWithStatus
        status={[healthFactorStatus]}
        skeletonStyle={{ ml: 1, height: '20px' }}
        value={
          <Typography sx={{ fontWeight: 600, ml: 1 }}>
            {healthFactor
              ? formatNumber(healthFactor, {
                  fractionDigits: 2,
                  suffix: BN(healthFactor).isGreaterThanOrEqualTo(15) ? '+' : '',
                })
              : '--'}
          </Typography>
        }
      />
    </Box>
  );
}
