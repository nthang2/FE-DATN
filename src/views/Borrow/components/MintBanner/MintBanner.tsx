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
        background: 'linear-gradient(0deg, #FFB6D9 0%, #FFF3F9 100%)',
        color: '#000',
        height: 'fit-content',
        padding: '36px 32px 24px 32px',
        mb: 2,
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 1, md: 0 },
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: 'bannerFloat 6s ease-in-out infinite',
        transition: 'all 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          animation: 'backgroundMove 20s linear infinite',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          animation: 'shimmerBanner 3s infinite',
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(255, 182, 217, 0.4)',
        },
        '@keyframes bannerFloat': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-8px)',
          },
        },
        '@keyframes backgroundMove': {
          '0%': {
            transform: 'translate(0, 0)',
          },
          '100%': {
            transform: 'translate(30px, 30px)',
          },
        },
        '@keyframes shimmerBanner': {
          '0%': {
            left: '-100%',
          },
          '100%': {
            left: '100%',
          },
        },
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
                ${compactNumber(Number(897455) || 0, 4)}
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
          Total Borrowed
        </Typography>
        <Typography variant="h2" fontWeight={700} fontSize="42px" sx={{ '& span': { flex: 1, margin: 'auto' } }}>
          <ValueWithStatus
            status={[status]}
            value={
              <Typography variant="h2" fontWeight={700} fontSize="42px">
                ${compactNumber(Number(674354) || 0, 4)}
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
