import { Table, TableBody, TableContainer, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo, useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import useLendingContract from 'src/hooks/useContract/useLendingContract';
import useInvestedValue from 'src/hooks/useQueryHook/queryBorrow/useInvestedValue';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import { useBorrowState, useBorrowSubmitState, useDepositState } from '../../state/hooks';
import { TBorrowItem } from '../../state/types';
import BorrowTableRow from './BorrowTableRow';
import DepositTableRow from './DepositTableRow';
import useFetchAllSolTokenBalances from 'src/states/wallets/solana-blockchain/hooks/useFetchAllSolTokenBalances';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';

const ActionSection = () => {
  const wallet = useWallet();
  const [borrowState] = useBorrowState();
  const [depositItems] = useDepositState();
  const [isSubmitted, setIsSubmitted] = useBorrowSubmitState();
  const { refetch: refetchDeposited } = useQueryDepositValue();
  const { maxBorrowPrice } = useInvestedValue();
  const { initLendingContract } = useLendingContract();
  const { address } = useSummarySolanaConnect();
  const { allSlpTokenBalances } = useFetchAllSolTokenBalances(address);

  const initDepositItems = useMemo(() => {
    return [...depositItems].filter((item) => !!item.value && item.value !== '0');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  const initBorrowItems = useMemo(() => {
    return borrowState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  const [actionStatus, setActionStatus] = useState<boolean[]>(() => {
    const result = [...initDepositItems, initBorrowItems].filter((item) => !!item.value && item.value !== '0');
    return Array(result.length).fill(false);
  });

  const handChangeActionStatus = (index: number) => {
    const result = actionStatus.map((item, i) => {
      if (index === i) {
        return true;
      }

      return item;
    });
    const isAllActionDone = result.every((item) => item);
    setActionStatus(result);
    if (isAllActionDone) {
      setIsSubmitted(false);
    }
  };

  const handleDeposit = async (depositItem: TBorrowItem, index: number) => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;
    const lendingContract = initLendingContract(wallet);
    const transHash = await lendingContract.deposit(Number(depositItem.value), depositItem.address);
    await refetchDeposited();
    await allSlpTokenBalances.refetch();
    handChangeActionStatus(index);

    return transHash;
  };

  const handleBorrow = async () => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;
    const isBorrowMaxValue = Number(borrowState.price) === maxBorrowPrice;
    const lendingContract = initLendingContract(wallet);
    const transHash = await lendingContract.borrow(Number(borrowState.value), depositItems[0].address, isBorrowMaxValue);
    handChangeActionStatus(actionStatus.length - 1);

    return transHash;
  };

  return (
    <BoxCustom p="24px 20px" hidden={!isSubmitted}>
      <Typography variant="h6" mb={3.5}>
        Actions
      </Typography>
      <TableContainer
        sx={{
          border: '1px solid #474744',
          borderRadius: 2,
          bgcolor: '#333331',
        }}
      >
        <Table>
          <TableBody>
            {initDepositItems.map((item, index) => (
              <DepositTableRow
                actionStatus={actionStatus[index]}
                index={index}
                key={index}
                depositItem={item}
                onClick={() => handleDeposit(item, index)}
              />
            ))}
            <BorrowTableRow
              actionStatus={actionStatus[actionStatus.length - 1]}
              index={actionStatus.length - 1}
              borrowItem={initBorrowItems}
              onClick={handleBorrow}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </BoxCustom>
  );
};

export default ActionSection;
