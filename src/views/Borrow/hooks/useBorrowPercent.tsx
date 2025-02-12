import { useMemo } from 'react';
import { useBorrowState, useDepositState } from '../state/hooks';

const useBorrowPercent = () => {
  const [borrowState] = useBorrowState();
  const [depositItems] = useDepositState();

  const totalDepositValue = useMemo(() => depositItems.reduce((total, item) => total + item.price, 0), [depositItems]);
  const borrowPercent = useMemo(() => {
    return (borrowState.price / totalDepositValue) * 100;
  }, [borrowState.price, totalDepositValue]);

  return { totalDepositValue, borrowPercent };
};

export default useBorrowPercent;
