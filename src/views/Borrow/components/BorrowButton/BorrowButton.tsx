import { Button } from '@mui/material';
import { useBorrowState, useDepositState } from '../../state/hooks';
import { useMemo } from 'react';

interface IProps {
  onSubmit: () => void;
  isHidden: boolean;
}

const BorrowButton = (props: IProps) => {
  const { onSubmit, isHidden } = props;
  const [borrowState] = useBorrowState();
  const [depositItems] = useDepositState();

  const isValidBorrow = useMemo(() => {
    if (borrowState.value === '0') return false;
    const totalDepositValue = depositItems.reduce((total, item) => total + item.price, 0);

    if (totalDepositValue === 0) return false;

    return totalDepositValue > borrowState.price;
  }, [borrowState.price, borrowState.value, depositItems]);

  if (isHidden) {
    return <></>;
  }

  return (
    <Button variant="contained" onClick={onSubmit} disabled={!isValidBorrow} fullWidth sx={{ mt: 2 }}>
      Borrow
    </Button>
  );
};

export default BorrowButton;
