import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TBorrowItem } from '../../state/types';
import { Button, Stack, TableCell, TableRow, Typography } from '@mui/material';

interface IProps {
  index: number;
  depositItem: TBorrowItem;
  onClick: () => void;
}

const DepositTableRow = (props: IProps) => {
  const {
    index,
    depositItem: { value, address },
    onClick,
  } = props;

  const tokenInfo = findTokenInfoByToken(address);

  return (
    <TableRow sx={{ padding: 3 }}>
      <TableCell width={100}>{index}</TableCell>
      <TableCell width={200}>Deposit {tokenInfo?.symbol}</TableCell>
      <TableCell width={400}>
        <Stack gap={0.5}>
          <Typography variant="body1">{value}</Typography>
          <Typography variant="body1" color="secondary">
            {tokenInfo?.symbol}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Button variant="contained" onClick={onClick}>
          Deposit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default DepositTableRow;
