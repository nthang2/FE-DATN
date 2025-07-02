import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Stack, Typography } from '@mui/material';
import { MinimumReceivedIcon, PriceImpactIcon } from 'src/assets/icons';

const SwapInfo = () => {
  return (
    <Stack flexDirection="column" gap={2} borderTop="1px solid #323326" borderBottom="1px solid #323326" py={2}>
      <Typography display="flex" alignItems="center" gap={1} variant="body1" color="text.secondary">
        <MinimumReceivedIcon /> Minimum received after slippage (0.50%)
      </Typography>

      <Typography display="flex" alignItems="center" gap={1} variant="body1" color="text.secondary">
        <PriceImpactIcon /> Price impact (0.50%)
      </Typography>

      <Typography display="flex" alignItems="center" gap={1} variant="body1" color="text.secondary">
        <LocalGasStationIcon /> Network Fee
      </Typography>
    </Stack>
  );
};

export default SwapInfo;
