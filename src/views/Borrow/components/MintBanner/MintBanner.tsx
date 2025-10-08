import { Box, Stack, Typography } from '@mui/material';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import useLendingMetrics from 'src/hooks/useQueryHook/queryBorrow/useLendingMetrics';
import { compactNumber } from 'src/utils/format';

const MintBanner = () => {
  const { data: lendingMetrics, status } = useLendingMetrics();

  const totalConvertedAmount = lendingMetrics?.convertedAmount?.reduce((acc, item) => acc + item.swappedAmount, 0);
  const totalDeposited = Number(lendingMetrics?.marketSize || 0) + Number(totalConvertedAmount || 0);

  return (
    <Stack
      sx={{
        borderRadius: '14px',
        background: 'linear-gradient(0deg, #F2F9A5 0%, #FEFFF3 100%)',
        color: '#000',
        height: 'fit-content',
        padding: '36px 32px 24px 32px',
        mb: 2,
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 1, md: 0 },
        alignItems: 'center',
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={1}
        textAlign={'center'}
        flex={1}
        borderRight={{ xs: 'none', md: '2px solid black' }}
      >
        <Typography variant="h6" fontWeight={600}>
          Total Deposited
        </Typography>
        <Typography variant="h2" fontWeight={700} fontSize="42px" sx={{ '& span': { flex: 1, margin: 'auto' } }}>
          <ValueWithStatus
            status={[status]}
            value={
              <Typography variant="h2" fontWeight={700} fontSize="42px">
                ${compactNumber(totalDeposited || 0, 4)}
              </Typography>
            }
            skeletonStyle={{ bgcolor: '#b7b4b4', height: '60px', width: '50%' }}
          />
        </Typography>
      </Box>

      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={1}
        textAlign={'center'}
        flex={1}
        // borderRight={{ xs: 'none', md: '2px solid black' }}
      >
        <Typography variant="h6" fontWeight={600}>
          Total Minted
        </Typography>
        <Typography variant="h2" fontWeight={700} fontSize="42px" sx={{ '& span': { flex: 1, margin: 'auto' } }}>
          <ValueWithStatus
            status={[status]}
            value={
              <Typography variant="h2" fontWeight={700} fontSize="42px">
                ${compactNumber(lendingMetrics?.totalBorrows || 0, 4)}
              </Typography>
            }
            skeletonStyle={{ bgcolor: '#b7b4b4', height: '60px', width: '50%' }}
          />
        </Typography>
      </Box>

      {/* <Box display={'flex'} flexDirection={'column'} gap={1} textAlign={'center'} flex={1}>
        <Typography variant="h6" fontWeight={600}>
          Borrow Rate
        </Typography>
        <Typography variant="h2" fontWeight={700} fontSize="42px">
          3%
        </Typography>
      </Box> */}
    </Stack>
  );
};

export default MintBanner;
