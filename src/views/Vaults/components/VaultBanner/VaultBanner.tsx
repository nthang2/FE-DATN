import { Box, Stack, Typography } from '@mui/material';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import useBannerInfo from 'src/hooks/useQueryHook/queryVault/useBannerInfo';
import { compactNumber, roundNumber } from 'src/utils/format';

const VaultBanner = () => {
  const { bannerInfo, status } = useBannerInfo();

  const apr = Number(bannerInfo?.apr || 0) <= 20 ? 20 : Number(bannerInfo?.apr);

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
          TVL
        </Typography>
        <Typography variant="h2" fontWeight={700} fontSize="42px">
          <ValueWithStatus
            status={[status]}
            value={
              <Typography variant="h2" fontWeight={700} fontSize="42px">
                ${compactNumber(bannerInfo?.tvl || 0, 2)}
              </Typography>
            }
            skeletonStyle={{ bgcolor: '#b7b4b4', height: '60px', width: '50%', alignSelf: 'center', margin: 'auto' }}
          />
        </Typography>
      </Box>

      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={1}
        textAlign={'center'}
        flex={1}
        sx={{
          '& span': { flex: 1 },
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          APR
        </Typography>
        <ValueWithStatus
          status={[status]}
          value={
            <Typography variant="h2" fontWeight={700} fontSize="42px" flex={1}>
              {roundNumber(apr, 2)}%
            </Typography>
          }
          skeletonStyle={{ bgcolor: '#c9c7c7', height: '60px', width: '50%', alignSelf: 'center' }}
        />
      </Box>
    </Stack>
  );
};

export default VaultBanner;
