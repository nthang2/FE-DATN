import { Table, TableBody, TableContainer, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract';
import { useBorrowState, useBorrowSubmitState, useDepositState } from '../../state/hooks';
import BorrowTableRow from './BorrowTableRow';
import DepositTableRow from './DepositTableRow';

const ActionSection = () => {
  const wallet = useWallet();
  const [borrowState] = useBorrowState();
  const [depositItems] = useDepositState();
  const [isSubmitted] = useBorrowSubmitState();

  const handleDeposit = async (depositValue: number) => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;
    const lendingContract = new LendingContract(wallet);
    await lendingContract.deposit(depositValue);
  };

  const handleBorrow = async () => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;
    const lendingContract = new LendingContract(wallet);
    await lendingContract.borrow(Number(borrowState.value));
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
              <DepositTableRow index={index + 1} key={index} depositItem={item} onClick={() => handleDeposit(Number(item.value))} />
            ))}
            <BorrowTableRow index={depositItems.length + 1} borrowItem={borrowState} onClick={handleBorrow} />
          </TableBody>
        </Table>
      </TableContainer>
    </BoxCustom>
  );
};

export default ActionSection;
