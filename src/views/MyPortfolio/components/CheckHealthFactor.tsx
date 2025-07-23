import { Box, Typography } from '@mui/material';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useHealthFactor from 'src/hooks/useQueryHook/queryBorrow/useHealthFactor';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';

interface IProps {
  token: SolanaEcosystemTokenInfo;
  mintAmount: string;
  depositAmount: string;
}

export default function CheckHealthFactor({ token, mintAmount, depositAmount }: IProps) {
  const { data: healthFactorData, status: healthFactorStatus } = useHealthFactor({
    depositItems: [{ address: token.address, value: depositAmount }],
    mintAmount: Number(mintAmount),
  });

  const { healthFactor } = healthFactorData || { healthFactor: '0' };

  const checkRank = () => {
    if (healthFactor) {
      if (BN(healthFactor).isLessThanOrEqualTo(1)) {
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
      <ValueWithStatus
        status={[healthFactorStatus]}
        skeletonStyle={{ ml: 1 }}
        value={
          <Typography sx={{ fontWeight: 600, ml: 1 }}>
            {healthFactor
              ? formatNumber(healthFactor, {
                  fractionDigits: 2,
                  suffix: BN(healthFactor).isGreaterThanOrEqualTo(100) ? '+' : '',
                })
              : '--'}
          </Typography>
        }
      />
    </Box>
  );
}
