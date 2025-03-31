import { Stack, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import { TLiquidatorCollateral } from 'src/services/HandleApi/getLiquidator/type';

interface IProps {
  data: TLiquidatorCollateral[];
  handleClaim: (address: string) => void;
}

const LiquidationRewardRow = (props: IProps) => {
  const { data, handleClaim } = props;
  const { asyncExecute, loading } = useAsyncExecute();

  return (
    <TableBody>
      {data.map((reward) => (
        <TableRow key={reward.collateralToken}>
          <TableCell sx={{ alignItems: 'center' }}>
            <Stack gap={1}>
              <Icon tokenName={reward.collateralToken as TokenName} />
              <Typography variant="body1" fontWeight={700} color="primary">
                {reward.collateralToken}
              </Typography>
            </Stack>
          </TableCell>

          <TableCell sx={{ alignItems: 'center' }}>
            <Typography variant="body1" fontWeight={700} color="primary">
              {reward.reward}
            </Typography>
          </TableCell>

          <TableCell sx={{ alignItems: 'center' }}>
            <Typography variant="body1" fontWeight={700} color="primary">
              ${reward.rewardUSD}
            </Typography>
          </TableCell>

          <TableCell sx={{ alignItems: 'center' }} width="115px">
            <ButtonLoading
              variant="contained"
              loading={loading}
              onClick={() => asyncExecute({ fn: async () => handleClaim(reward.collateralAddress) })}
            >
              Claim
            </ButtonLoading>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default LiquidationRewardRow;
