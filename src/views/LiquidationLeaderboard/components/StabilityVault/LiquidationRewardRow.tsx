import { Stack, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import { TLiquidatorCollateral } from 'src/services/HandleApi/getLiquidator/type';
import { BN } from 'src/utils';

interface IProps {
  data: TLiquidatorCollateral[];
  handleClaim: (address: string) => void;
}

const LiquidationRewardRow = (props: IProps) => {
  const { data, handleClaim } = props;
  const { asyncExecute, loading } = useAsyncExecute();

  return (
    <TableBody>
      {Object.keys(listTokenAvailable).map((tokenName) => {
        const reward = data.find((item) => item.collateralToken === tokenName);
        const isDisable = !reward?.rewardUSD || BN(reward?.rewardUSD).isEqualTo(0);

        return (
          <TableRow key={reward?.collateralToken}>
            <TableCell sx={{ alignItems: 'center' }}>
              <Stack gap={1}>
                <Icon tokenName={tokenName as TokenName} />
                <Typography variant="body1" fontWeight={700} color="primary">
                  {tokenName}
                </Typography>
              </Stack>
            </TableCell>

            <TableCell sx={{ alignItems: 'center' }}>
              <Typography variant="body1" fontWeight={700} color="primary">
                {reward?.reward || 0}
              </Typography>
            </TableCell>

            <TableCell sx={{ alignItems: 'center' }}>
              <Typography variant="body1" fontWeight={700} color="primary">
                ${reward?.rewardUSD || 0}
              </Typography>
            </TableCell>

            <TableCell sx={{ alignItems: 'center' }} width="115px">
              <ButtonLoading
                variant="contained"
                loading={loading}
                disabled={isDisable}
                onClick={() => asyncExecute({ fn: async () => handleClaim(reward?.collateralAddress || '') })}
              >
                Claim
              </ButtonLoading>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default LiquidationRewardRow;
