import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';

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
                <ButtonLoading variant="contained">Claim</ButtonLoading>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LiquidationRewardModal;
