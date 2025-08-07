import { Box, Typography } from '@mui/material';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import useStakedInfo from 'src/hooks/useQueryHook/queryVault/useStakedInfo';
import { formatNumber, roundNumber } from 'src/utils/format';

const StakedAmount = () => {
  const { stakeInfo, status } = useStakedInfo();

  return (
    <Box
      sx={{
        p: '36px 20px 24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        minWidth: '350px',
        bgcolor: '#2A2A2A',
        borderRadius: '14px',
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        Staked Amount
      </Typography>
      <Typography variant="h2" fontWeight={700} fontSize="42px" sx={{ color: 'primary.main' }}>
        <ValueWithStatus
          status={[status]}
          value={
            <Typography variant="h2" fontWeight={700} fontSize="42px">
              ${formatNumber(stakeInfo?.amount || 0, { fractionDigits: 4, delimiter: ',' })}
            </Typography>
          }
          skeletonStyle={{ bgcolor: '#b7b4b4', height: '60px', width: '50%' }}
        />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {roundNumber(Number(stakeInfo?.amount || 0), 6)} USDAI
      </Typography>
    </Box>
  );
};

export default StakedAmount;
