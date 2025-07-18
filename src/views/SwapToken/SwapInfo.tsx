import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { Collapse, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MinimumReceivedIcon, PriceImpactIcon } from 'src/assets/icons';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract/LendingContract';
import useGetTransFee from 'src/hooks/useContract/useGetTransFee';
import { decimalFlood } from 'src/utils/format';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
  selectedToken: string;
  amount: string;
  convertFee: number;
  isReverse: boolean;
  usdaiAmount: string;
}

const SwapInfo = (props: Props) => {
  const { selectedToken, amount, convertFee, isReverse, usdaiAmount } = props;
  const wallet = useWallet();
  const tokenInfo = findTokenInfoByToken(selectedToken);
  const { mutateAsync: getTransFee } = useGetTransFee();

  const [networkFee, setNetworkFee] = useState(0);
  const [openCollapse, setOpenCollapse] = useState(false);

  const feeValue = (convertFee / 100) * (Number(amount) / 100);
  const amountValue = useMemo(() => {
    if (isReverse) {
      return Number(decimalFlood(usdaiAmount, 9)) || 0;
    }

    return Number(decimalFlood(amount, tokenInfo?.decimals || 0)) || 0;
  }, [amount, isReverse, tokenInfo?.decimals, usdaiAmount]);

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
          <MinimumReceivedIcon /> Minimum received
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {amountValue} {!isReverse ? tokenInfo?.symbol : 'USDAI'}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography display="flex" alignItems="center" gap={1} variant="body1" color="text.secondary">
          <PriceImpactIcon /> Price impact
        </Typography>

        <Typography variant="body1" color="text.secondary">
          0.00%
        </Typography>
      </Stack>

      <div>
        <Stack sx={{ cursor: 'pointer' }} direction="row" justifyContent="space-between" onClick={() => setOpenCollapse(!openCollapse)}>
          <Typography display="flex" alignItems="center" gap={1} variant="body1" color="text.secondary">
            <LocalGasStationIcon /> Fee
          </Typography>

          <Typography variant="body1" color="text.secondary">
            <KeyboardArrowDownIcon sx={{ transform: openCollapse ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all 0.3s ease' }} />
          </Typography>
        </Stack>

        <Collapse in={openCollapse}>
          <Stack direction="column" gap={2} mt={2} pl={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography display="flex" alignItems="center" gap={1} variant="body2" color="text.secondary">
                Convert fee
              </Typography>

              <Typography variant="body2" color="text.secondary">
                ${decimalFlood(feeValue, 6)}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography display="flex" alignItems="center" gap={1} variant="body2" color="text.secondary">
                Network fee
              </Typography>

              <Typography variant="body2" color="text.secondary">
                ~${decimalFlood(networkFee, 6)}
              </Typography>
            </Stack>
          </Stack>
        </Collapse>
      </div>
    </Stack>
  );
};

export default SwapInfo;
