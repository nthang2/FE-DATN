import { Button } from '@mui/material';
import { useMemo } from 'react';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { useBorrowState, useBorrowSubmitState, useDepositState } from '../../state/hooks';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useQueryYourBorrow from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryYourBorrow';
import { convertToUsd } from '../../utils';

const BorrowButton = () => {
  const [borrowState] = useBorrowState();
  const [depositItems] = useDepositState();
  const [isSubmitted, setIsSubmitted] = useBorrowSubmitState();
  const { address } = useSummarySolanaConnect();
  const { data: listPrice } = useQueryAllTokensPrice();
  const { data: depositedValue } = useQueryDepositValue();
  const { data: yourBorrow } = useQueryYourBorrow();

  const yourBorrowByAddress = useMemo(() => {
    const mintedByAddress = yourBorrow ? yourBorrow[depositItems[0].address] : 0;
    return mintedByAddress ? Number(mintedByAddress) : 0;
  }, [depositItems, yourBorrow]);

  const depositedByAddress = useMemo(() => {
    if (!depositedValue || !listPrice) return 0;
    const depositAddress = depositItems[0].address;
    return convertToUsd(depositAddress, depositedValue[depositAddress], listPrice) || 0;
  }, [depositItems, depositedValue, listPrice]);

  const isValidBorrow = useMemo(() => {
    const totalDeposit = depositItems[0].price + depositedByAddress;
    const totalMint = yourBorrowByAddress + borrowState.price;
    const borrowError = !borrowState.error;

    return borrowError && totalDeposit > 0 && totalMint > 0;
  }, [borrowState.error, borrowState.price, depositItems, depositedByAddress, yourBorrowByAddress]);

  if (isSubmitted) {
    return (
      <Button variant="contained" onClick={() => setIsSubmitted(false)} fullWidth sx={{ mt: 2 }}>
        Cancel
      </Button>
    );
  }

  return (
    <Button variant="contained" onClick={() => setIsSubmitted(true)} disabled={!address || !isValidBorrow} fullWidth sx={{ mt: 2 }}>
      Mint
    </Button>
  );
};

export default BorrowButton;
