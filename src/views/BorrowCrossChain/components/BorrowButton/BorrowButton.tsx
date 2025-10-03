import { Button } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { LendingContractUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingContractUniversal';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useInvestedValueUniversal from 'src/hooks/useQueryHook/queryBorrowUniversal/useInvestedValueUniversal';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';
import useGetListWallet from 'src/views/UniversalWallet/hooks/useGetListWallet';
import { useBorrowCrossState, useBorrowCrossSubmitState, useDepositCrossState, useSelectedNetworkBorrowState } from '../../state/hooks';
import useBorrowEVM from 'src/hooks/mutations/useBorrowEVM';
import { mapNameNetwork } from 'src/constants/network';

const BorrowButton = () => {
  const wallet = useWallet();
  const [borrowState, setBorrowState] = useBorrowCrossState();
  const [depositItems] = useDepositCrossState();
  const [isSubmitted, setIsSubmitted] = useBorrowCrossSubmitState();
  const { address, chainId } = useSummaryFirstActiveConnect();
  const { asyncExecute, loading } = useAsyncExecute();
  const { maxBorrowPrice } = useInvestedValueUniversal();
  const listConnectWallet = useSummaryConnect();
  const { data: listWallet } = useGetListWallet(chainId, address);
  const { mutateAsync: borrowEVM } = useBorrowEVM();
  const [borrowNetwork] = useSelectedNetworkBorrowState();

  const isOnlyMint = useMemo(() => {
    const depositValue = depositItems.some((item) => Number(item.value) > 0);
    if (!depositValue) {
      return Number(borrowState.value) > 0;
    }

    return false;
  }, [borrowState.value, depositItems]);

  const isConnectAllUniversalWallet = useMemo(() => {
    if (!listWallet || !listWallet?.universalWallet) {
      return false;
    }

    return listWallet.wallets.every((wallet) => listConnectWallet.map((wallet) => wallet.address).indexOf(wallet.walletAddress) > -1);
  }, [listConnectWallet, listWallet]);

  const isValidBorrow = useMemo(() => {
    if (!isConnectAllUniversalWallet) {
      return false;
    }

    const borrowError = !borrowState.error;
    const depositError = depositItems.some((item) => Boolean(item.error));
    const formValue = Number(borrowState.value) > 0 || depositItems.some((item) => Number(item.value) > 0);

    return borrowError && formValue && !depositError;
  }, [borrowState, depositItems, isConnectAllUniversalWallet]);

  const handleBorrow = async () => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;

    await asyncExecute({
      fn: async () => {
        if (!address) return;
        let hash = '';
        console.log('borrowNetwork', borrowNetwork);

        if (borrowNetwork.toLowerCase() === mapNameNetwork.solana.name.toLowerCase()) {
          const lendingContract = new LendingContractUniversal(wallet);
          const isBorrowMaxValue = Number(borrowState.price) === maxBorrowPrice;
          hash = await lendingContract.borrow(
            Number(borrowState.value),
            borrowState.address,
            isBorrowMaxValue,
            listWallet?.universalWallet
          );
        } else {
          hash = await borrowEVM({ borrowAmount: borrowState.value, selectedToken: borrowState.address });
        }

        return hash;
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
