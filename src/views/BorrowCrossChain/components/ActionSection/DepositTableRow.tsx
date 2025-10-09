import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import { roundNumber } from 'src/utils/format';
import { useDepositCrossState } from '../../state/hooks';
import { TBorrowCrossItem } from '../../state/types';
import { findTokenInfoByToken } from 'src/constants/tokens/mapNameToInfo';
import { mapNameNetwork } from 'src/constants/network';

interface IProps {
  index: number;
  depositItem: TBorrowCrossItem;
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
  const [depositItems, setDepositItems] = useDepositCrossState();
  const { asyncExecute, loading } = useAsyncExecute();
  const tokenInfo = findTokenInfoByToken(address, depositItems[index].network || mapNameNetwork.solana.name);

  const handleReset = () => {
    setDepositItems(() => {
      const cloneArr = depositItems.map((item) => {
        if (item.address === address) {
          return { ...item, value: '0', price: 0 };
        }
        return item;
      });

      return cloneArr;
    });
  };

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
          <ButtonLoading
            loading={loading}
            variant="contained"
            onClick={() => asyncExecute({ fn: onClick, onSuccess: handleReset })}
            sx={{ minWidth: '100px' }}
          >
            Deposit
          </ButtonLoading>
        )}
      </TableCell>
    </TableRow>
  );
};

export default DepositTableRow;
