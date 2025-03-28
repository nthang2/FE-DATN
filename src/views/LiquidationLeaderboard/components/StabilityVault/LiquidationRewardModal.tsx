import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { Icon, TokenName } from 'crypto-token-icon';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { mapNameToInfoSolana, TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LiquidatorContract } from 'src/contracts/solana/contracts/LiquidatorContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';

const tableHead = ['Token', 'Amount', 'Value', ''];

export type TLiquidationReward = {
  tokenName: string;
  amount: number;
  value: number;
};

interface IProps {
  rewards: TLiquidationReward[];
}

const LiquidationRewardModal = (props: IProps) => {
  const { rewards } = props;
  const wallet = useWallet();
  const { asyncExecute, loading } = useAsyncExecute();

  const handleClaimReward = async (tokenName: string) => {
    if (!wallet) return;

    const collateral = mapNameToInfoSolana[tokenName as TSolanaToken].address;
    const contract = new LiquidatorContract(wallet);
    const hash = await contract.claim(collateral);

    return hash;
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tableHead.map((header) => (
              <TableCell key={header} align="left">
                <Typography variant="caption2" sx={{ color: '#888880' }}>
                  {header}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rewards.map((reward) => (
            <TableRow key={reward.tokenName}>
              <TableCell sx={{ alignItems: 'center' }}>
                <Stack gap={1}>
                  <Icon tokenName={reward.tokenName as TokenName} />
                  <Typography variant="body1" fontWeight={700} color="primary">
                    {reward.tokenName}
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell sx={{ alignItems: 'center' }}>
                <Typography variant="body1" fontWeight={700} color="primary">
                  ${reward.amount}
                </Typography>
              </TableCell>

              <TableCell sx={{ alignItems: 'center' }}>
                <Typography variant="body1" fontWeight={700} color="primary">
                  ${reward.value}
                </Typography>
              </TableCell>

              <TableCell sx={{ alignItems: 'center' }} width="115px">
                <ButtonLoading
                  variant="contained"
                  loading={loading}
                  onClick={() => asyncExecute({ fn: () => handleClaimReward(reward.tokenName) })}
                >
                  Claim
                </ButtonLoading>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LiquidationRewardModal;
