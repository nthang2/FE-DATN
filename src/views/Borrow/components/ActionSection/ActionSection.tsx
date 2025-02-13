import { Table, TableBody, TableContainer, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract';
import { useBorrowState, useBorrowSubmitState, useDepositState } from '../../state/hooks';
import BorrowTableRow from './BorrowTableRow';
import DepositTableRow from './DepositTableRow';
import { TBorrowItem } from '../../state/types';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useQueryYourBorrow from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryYourBorrow';

const ActionSection = () => {
  const wallet = useWallet();
  const [borrowState] = useBorrowState();
  const [depositItems] = useDepositState();
  const [isSubmitted] = useBorrowSubmitState();
  const { refetch: refetchDeposited } = useQueryDepositValue();
  const { refetch: refetchYourBorrow } = useQueryYourBorrow();

  const [actionStatus, setActionStatus] = useState<boolean[]>(() => {
    return Array(depositItems.length + 1).fill(false);
  });

  const handChangeActionStatus = (index: number) => {
    const cloneArr = [...actionStatus];
    cloneArr.splice(index, 1, true);
    setActionStatus(cloneArr);
  };

  const handleDeposit = async (depositItem: TBorrowItem, index: number) => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;
    const lendingContract = new LendingContract(wallet);
    await lendingContract.deposit(Number(depositItem.value), depositItem.address);
    await refetchDeposited();
    handChangeActionStatus(index);
  };

  const handleBorrow = async () => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;
    const lendingContract = new LendingContract(wallet);
    await lendingContract.borrow(Number(borrowState.value), borrowState.address);
    await refetchYourBorrow();
    handChangeActionStatus(actionStatus.length);
  };

  return (
    <BoxCustom p="24px 20px" hidden={!isSubmitted}>
      <Typography variant="h6" mb={3.5}>
        Actions
      </Typography>
      <TableContainer sx={{ border: '1px solid #474744', borderRadius: 2, bgcolor: '#333331' }}>
        <Table>
          <TableBody>
            {depositItems.map((item, index) => (
              <DepositTableRow
                actionStatus={actionStatus[index]}
                index={index + 1}
                key={index}
                depositItem={item}
                onClick={() => handleDeposit(item, index)}
              />
            ))}
            <BorrowTableRow
              actionStatus={actionStatus[depositItems.length + 1]}
              index={depositItems.length + 1}
              borrowItem={borrowState}
              onClick={handleBorrow}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </BoxCustom>
  );
};

export default ActionSection;
