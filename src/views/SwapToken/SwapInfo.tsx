import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useState } from 'react';
import { MinimumReceivedIcon, PriceImpactIcon } from 'src/assets/icons';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract/LendingContract';
import useGetTransFee from 'src/hooks/useContract/useGetTransFee';
import { decimalFlood } from 'src/utils/format';

interface Props {
  selectedToken: string;
  amount: string;
}

const SwapInfo = (props: Props) => {
  const { selectedToken, amount } = props;
  const wallet = useWallet();
  const tokenInfo = findTokenInfoByToken(selectedToken);
  const amountValue = amount === '' ? 0 : decimalFlood(amount, tokenInfo?.decimals || 0);
  const { mutateAsync: getTransFee } = useGetTransFee();
  const [networkFee, setNetworkFee] = useState(0);

  const getNetworkFee = useCallback(async () => {
    if (!wallet || networkFee > 0) return;
    const contract = new LendingContract(wallet);
    //simulate swap 1 token to get network fee
    const instruction = await contract.getSwapTokenInstruction(selectedToken, Number(amount), false);
    const fee = await getTransFee(instruction);
    setNetworkFee(fee);
  }, [wallet, getTransFee, networkFee, amount, selectedToken]);

  useEffect(() => {
    getNetworkFee();
  }, [getNetworkFee]);

  return (
    <Stack flexDirection="column" gap={2} borderTop="1px solid #323326" borderBottom="1px solid #323326" py={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography display="flex" alignItems="center" gap={1} variant="body1" color="text.secondary">
          <MinimumReceivedIcon /> Minimum received after slippage (0%)
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
          ~${networkFee}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SwapInfo;
