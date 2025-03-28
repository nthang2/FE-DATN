import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import { formatNumber } from 'src/utils/format';
import { TBorrowItem } from '../../state/types';
import { BN } from 'src/utils';

interface IProps {
  index: number;
  borrowItem: TBorrowItem;
  onClick: () => Promise<string | undefined>;
  actionStatus: boolean;
}

const BorrowTableRow = (props: IProps) => {
  const {
    index,
    borrowItem: { value, address },
    onClick,
    actionStatus,
  } = props;
  const { asyncExecute, loading } = useAsyncExecute();
  const tokenInfo = findTokenInfoByToken(address);

  if (BN(value).isLessThanOrEqualTo(0)) {
    return null;
  }

  return (
    <TableRow sx={{ padding: 3 }}>
      <TableCell width={100}>{index + 1}</TableCell>
      <TableCell width={200}>Mint {tokenInfo?.symbol}</TableCell>
      <TableCell width={400}>
        <Stack gap={0.5}>
          <Typography variant="body1">{formatNumber(value, { fractionDigits: 6 })}</Typography>
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
            Mint
          </ButtonLoading>
        )}
      </TableCell>
    </TableRow>
  );
};

export default BorrowTableRow;
