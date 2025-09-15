import { Box, Typography } from '@mui/material';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import useStakedInfo from 'src/hooks/useQueryHook/queryVault/useStakedInfo';
import { roundNumber } from 'src/utils/format';
import { NumericFormat } from 'react-number-format';

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
        bgcolor: 'background.content',
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
              <NumericFormat displayType="text" value={stakeInfo?.amount || 0} thousandSeparator={true} decimalScale={4} />
            </Typography>
          }
          skeletonStyle={{ bgcolor: '#b7b4b4', height: '60px', width: '50%' }}
        />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {roundNumber(Number(stakeInfo?.amount || 0), 6)} USD
      </Typography>
    </Box>
  );
};

export default StakedAmount;
