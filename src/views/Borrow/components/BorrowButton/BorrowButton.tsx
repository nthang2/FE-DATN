import { Button } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useQueryYourBorrow from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryYourBorrow';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { useBorrowState, useBorrowSubmitState, useDepositState } from '../../state/hooks';
import { convertToUsd } from '../../utils';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';

const BorrowButton = () => {
  const wallet = useWallet();
  const [borrowState, setBorrowState] = useBorrowState();
  const [depositItems] = useDepositState();
  const [isSubmitted, setIsSubmitted] = useBorrowSubmitState();
  const { address } = useSummarySolanaConnect();
  const { data: listPrice } = useQueryAllTokensPrice();
  const { data: depositedValue } = useQueryDepositValue();
  const { data: yourBorrow, refetch: refetchYourBorrow } = useQueryYourBorrow();
  const { asyncExecute, loading } = useAsyncExecute();

  const yourBorrowByAddress = useMemo(() => {
    const mintedByAddress = yourBorrow ? yourBorrow[depositItems[0].address] : 0;
    return mintedByAddress ? Number(mintedByAddress) : 0;
  }, [depositItems, yourBorrow]);

  const depositedByAddress = useMemo(() => {
    if (!depositedValue || !listPrice) return 0;
    const depositAddress = depositItems[0].address;
    return convertToUsd(depositAddress, depositedValue[depositAddress], listPrice) || 0;
  }, [depositItems, depositedValue, listPrice]);

  const isOnlyMint = useMemo(() => {
    const depositValue = depositItems[0].value;
    if (depositValue === '0' || !depositValue) {
      if (Number(borrowState.value) > 0) {
        return true;
      }
    }

    return false;
  }, [borrowState.value, depositItems]);

  const isValidBorrow = useMemo(() => {
    const totalDeposit = depositItems[0].price + depositedByAddress;
    const totalMint = yourBorrowByAddress + borrowState.price;
    const borrowError = !borrowState.error;
    const depositError = depositItems.every((item) => Boolean(item.error));
    const formValue = Number(borrowState.value) > 0 || Number(depositItems[0].value) > 0;

    return borrowError && formValue && !depositError && totalDeposit > 0 && totalMint > 0;
  }, [borrowState.error, borrowState.price, borrowState.value, depositItems, depositedByAddress, yourBorrowByAddress]);

  const handleBorrow = async () => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;

    await asyncExecute({
      fn: async () => {
        const lendingContract = new LendingContract(wallet);
        const transHash = await lendingContract.borrow(Number(borrowState.value), depositItems[0].address);
        await refetchYourBorrow();

        return transHash;
      },
    });
  };

  const handleOnClick = async () => {
    if (isOnlyMint) {
      handleBorrow();
      setBorrowState({ ...borrowState, value: '0' });
      return;
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Button variant="contained" onClick={() => setIsSubmitted(false)} fullWidth sx={{ mt: 2 }}>
        Cancel
      </Button>
    );
  }

  return (
    <ButtonLoading
      loading={loading}
      variant="contained"
      onClick={handleOnClick}
      disabled={!address || !isValidBorrow}
      fullWidth
      sx={{ mt: 2 }}
    >
      Mint
    </ButtonLoading>
  );
};

export default BorrowButton;
