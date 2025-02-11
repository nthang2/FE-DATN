import { Box, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';

export default function HealthFactor() {
  return (
    <BoxCustom
      sx={{
        background:
          ' radial-gradient(54.44% 92.03% at 45.31% 45.56%, #464609 0%, #211509 50%, #1E1E18 100%) ,radial-gradient(117.19% 85.06% at 85.21% 14.94%, rgba(6, 38, 3, 0.8) 0%, rgba(33, 21, 9, 0) 50%, rgba(30, 30, 24, 0) 100%) ,radial-gradient(85.74% 327.55% at 12.17% 86.26%, rgba(51, 7, 30, 0.8) 0%, rgba(33, 21, 9, 0) 50%, rgba(30, 30, 24, 0) 100%) ,radial-gradient(214.19% 368.23% at 1.52% 1.91%, #100F02 0%, rgba(33, 21, 9, 0) 50%, rgba(33, 21, 9, 0) 100%)',
      }}
    >
      <Box className="flex-start">
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          HealthFactor
        </Typography>
        <TooltipInfo title="Health factor" />
      </Box>
    </BoxCustom>
  );
}
