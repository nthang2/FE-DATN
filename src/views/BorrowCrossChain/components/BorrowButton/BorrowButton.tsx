import { Button } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { LendingContractUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingContractUniversal';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { useBorrowCrossState, useBorrowCrossSubmitState, useDepositCrossState } from '../../state/hooks';
import useInvestedValueUniversal from 'src/hooks/useQueryHook/queryBorrowUniversal/useInvestedValueUniversal';

const BorrowButton = () => {
  const wallet = useWallet();
  const [borrowState, setBorrowState] = useBorrowCrossState();
  const [depositItems] = useDepositCrossState();
  const [isSubmitted, setIsSubmitted] = useBorrowCrossSubmitState();
  const { address } = useSummarySolanaConnect();
  const { asyncExecute, loading } = useAsyncExecute();
  const { maxBorrowPrice } = useInvestedValueUniversal();

  const isOnlyMint = useMemo(() => {
    const depositValue = depositItems.some((item) => Number(item.value) > 0);
    if (!depositValue) {
      return Number(borrowState.value) > 0;
    }

    return false;
  }, [borrowState.value, depositItems]);

  const isValidBorrow = useMemo(() => {
    const borrowError = !borrowState.error;
    const depositError = depositItems.some((item) => Boolean(item.error));
    const formValue = Number(borrowState.value) > 0 || depositItems.some((item) => Number(item.value) > 0);

    return borrowError && formValue && !depositError;
  }, [borrowState, depositItems]);

  const handleBorrow = async () => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;

    await asyncExecute({
      fn: async () => {
        const isBorrowMaxValue = Number(borrowState.price) === maxBorrowPrice;
        const lendingContract = new LendingContractUniversal(wallet);
        const transHash = await lendingContract.borrow(Number(borrowState.value), depositItems[0].address, isBorrowMaxValue);

        return transHash;
      },
      onError: () => setBorrowState({ ...borrowState, value: '0', price: 0 }),
      onSuccess: () => setBorrowState({ ...borrowState, value: '0', price: 0 }),
    });
  };

  const handleOnClick = async () => {
    if (isOnlyMint) {
      handleBorrow();
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
