import { Button } from '@mui/material';
import { useMemo } from 'react';
import { useBorrowState, useBorrowSubmitState, useDepositState } from '../../state/hooks';

const BorrowButton = () => {
  const [borrowState] = useBorrowState();
  const [depositItems] = useDepositState();
  const [isSubmitted, setIsSubmitted] = useBorrowSubmitState();

  const isValidBorrow = useMemo(() => {
    if (borrowState.value === '0') return false;
    const totalDepositValue = depositItems.reduce((total, item) => total + item.price, 0);

    if (totalDepositValue === 0) return false;

    return totalDepositValue > borrowState.price;
  }, [borrowState.price, borrowState.value, depositItems]);

  if (isSubmitted) {
    return <></>;
  }

  return (
    <Button variant="contained" onClick={() => setIsSubmitted(true)} disabled={!isValidBorrow} fullWidth sx={{ mt: 2 }}>
      Borrow
    </Button>
  );
};

export default BorrowButton;
