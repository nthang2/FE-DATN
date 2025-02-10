import { Button, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TBorrowItem } from '../../state/types';

interface IProps {
  index: number;
  borrowItem: TBorrowItem;
}

const BorrowTableRow = (props: IProps) => {
  const {
    index,
    borrowItem: { value, address },
  } = props;

  const tokenInfo = findTokenInfoByToken(address);

  return (
    <TableRow sx={{ padding: 3 }}>
      <TableCell width={100}>{index}</TableCell>
      <TableCell width={200}>Borrow {tokenInfo?.symbol}</TableCell>
      <TableCell width={400}>
        <Stack gap={0.5}>
          <Typography variant="body1">{value}</Typography>
          <Typography variant="body1" color="secondary">
            {tokenInfo?.symbol}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Button variant="contained" disabled>
          Borrow
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default BorrowTableRow;
