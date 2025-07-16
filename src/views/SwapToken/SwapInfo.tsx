import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Stack, Typography } from '@mui/material';
import { MinimumReceivedIcon, PriceImpactIcon } from 'src/assets/icons';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useGetTransFee from 'src/hooks/useContract/useGetTransFee';
import { decimalFlood } from 'src/utils/format';

interface Props {
  selectedToken: string;
  amount: string;
}

const SwapInfo = (props: Props) => {
  const { selectedToken, amount } = props;
  const tokenInfo = findTokenInfoByToken(selectedToken);
  const amountValue = amount === '' ? 0 : decimalFlood(amount, tokenInfo?.decimals || 0);
  const { data: transFee } = useGetTransFee();

  return (
    <Stack flexDirection="column" gap={2} borderTop="1px solid #323326" borderBottom="1px solid #323326" py={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography display="flex" alignItems="center" gap={1} variant="body1" color="text.secondary">
          <MinimumReceivedIcon /> Minimum received after slippage (0.50%)
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {amountValue} {tokenInfo?.symbol}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography display="flex" alignItems="center" gap={1} variant="body1" color="text.secondary">
          <PriceImpactIcon /> Price impact (0)
        </Typography>

        <Typography variant="body1" color="text.secondary">
          0.00%
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography display="flex" alignItems="center" gap={1} variant="body1" color="text.secondary">
          <LocalGasStationIcon /> Network Fee
        </Typography>

        <Typography variant="body1" color="text.secondary">
          ~${transFee}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SwapInfo;
