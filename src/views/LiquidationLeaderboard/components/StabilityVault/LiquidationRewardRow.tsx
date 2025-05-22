import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import { TokenName } from 'src/libs/crypto-icons';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { TLiquidatorCollateral } from 'src/services/HandleApi/getLiquidator/type';
import { BN } from 'src/utils';
import { decimalFlood } from 'src/utils/format';

interface IProps {
  data: TLiquidatorCollateral[];
  handleClaim: (address: string) => void;
  tokenName: string;
}

const LiquidationRewardRow = (props: IProps) => {
  const { data, handleClaim, tokenName } = props;
  const { asyncExecute, loading } = useAsyncExecute();
  const reward = data.find((item) => item.collateralToken === tokenName);
  const isDisable = !reward?.rewardUSD || BN(reward?.rewardUSD).isEqualTo(0);

  return (
    <TableRow key={reward?.collateralToken}>
      <TableCell sx={{ alignItems: 'center' }}>
        <Stack gap={1}>
          <IconToken tokenName={tokenName as TokenName} />
          <Typography variant="body1" fontWeight={700} color="primary">
            {tokenName}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell sx={{ alignItems: 'center' }}>
        <Typography variant="body1" fontWeight={700} color="primary">
          {decimalFlood(reward?.reward || 0, 6)}
        </Typography>
      </TableCell>

      <TableCell sx={{ alignItems: 'center' }}>
        <Typography variant="body1" fontWeight={700} color="primary">
          ${decimalFlood(reward?.rewardUSD || 0, 6)}
        </Typography>
      </TableCell>

      <TableCell sx={{ alignItems: 'center' }} width="115px">
        <ButtonLoading
          variant="contained"
          loading={loading}
          disabled={isDisable}
          onClick={() => asyncExecute({ fn: async () => handleClaim(reward?.collateralAddress || '') })}
          textLoading=" "
          sx={{ minWidth: '75px' }}
        >
          Claim
        </ButtonLoading>
      </TableCell>
    </TableRow>
  );
};

export default LiquidationRewardRow;
