import { Button } from '@mui/material';
import { useMemo } from 'react';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { useBorrowState, useBorrowSubmitState, useDepositState } from '../../state/hooks';

const BorrowButton = () => {
  const [borrowState] = useBorrowState();
  const [depositItems] = useDepositState();
  const [isSubmitted, setIsSubmitted] = useBorrowSubmitState();
  const { address } = useSummarySolanaConnect();

  const isValidBorrow = useMemo(() => {
    if (borrowState.value === '0') return false;
    const borrowError = !borrowState.error;
    const depositError = depositItems.every((item) => !item.error && Number(item.value) !== 0);

    return borrowError && depositError;
  }, [borrowState.error, borrowState.value, depositItems]);

  if (isSubmitted) {
    return (
      <Button variant="contained" onClick={() => setIsSubmitted(false)} fullWidth sx={{ mt: 2 }}>
        Cancel
      </Button>
    );
  }

  return (
    <Button variant="contained" onClick={() => setIsSubmitted(true)} disabled={!address || !isValidBorrow} fullWidth sx={{ mt: 2 }}>
      Borrow
    </Button>
  );
};

export default BorrowButton;
