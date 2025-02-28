import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import { TBorrowItem } from '../../state/types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { roundNumber } from 'src/utils/format';

interface IProps {
  index: number;
  depositItem: TBorrowItem;
  onClick: () => Promise<string | undefined>;
  actionStatus: boolean;
}

const DepositTableRow = (props: IProps) => {
  const {
    index,
    depositItem: { value, address },
    onClick,
    actionStatus,
  } = props;
  const { asyncExecute, loading } = useAsyncExecute();
  const tokenInfo = findTokenInfoByToken(address);

  if (value === '0' || !value) {
    return null;
  }

  return (
    <TableRow sx={{ padding: 3 }}>
      <TableCell width={100}>{index + 1}</TableCell>
      <TableCell width={200}>Deposit {tokenInfo?.symbol}</TableCell>
      <TableCell width={400}>
        <Stack gap={0.5}>
          <Typography variant="body1">{roundNumber(value, 4)}</Typography>
          <Typography variant="body1" color="secondary">
            {tokenInfo?.symbol}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="center">
        {actionStatus ? (
          <CheckCircleIcon fontSize="large" color="success" />
        ) : (
          <ButtonLoading loading={loading} variant="contained" onClick={() => asyncExecute({ fn: onClick })} sx={{ minWidth: '100px' }}>
            Deposit
          </ButtonLoading>
        )}
      </TableCell>
    </TableRow>
  );
};

export default DepositTableRow;
