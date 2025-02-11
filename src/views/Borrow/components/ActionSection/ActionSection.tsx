import { Table, TableBody, TableContainer, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract';
import { useBorrowState, useDepositState } from '../../state/hooks';
import BorrowTableRow from './BorrowTableRow';
import DepositTableRow from './DepositTableRow';

interface IProps {
  isHidden: boolean;
}

const ActionSection = ({ isHidden }: IProps) => {
  const [borrowState] = useBorrowState();
  const [depositItems] = useDepositState();
  const wallet = useWallet();

  const handleDeposit = async () => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;
    const lendingContract = new LendingContract(wallet);
    await lendingContract.initialize();
    // lendingContract.program.methods.liquidate
  };

  return (
    <BoxCustom p="24px 20px" hidden={isHidden}>
      <Typography variant="h6" mb={3.5} onClick={() => handleDeposit()}>
        Actions
      </Typography>

      <TableContainer sx={{ border: '1px solid #474744', borderRadius: 2, bgcolor: '#333331' }}>
        <Table>
          <TableBody>
            {depositItems.map((item, index) => (
              <DepositTableRow index={index + 1} key={index} depositItem={item} />
            ))}
            <BorrowTableRow index={depositItems.length + 1} borrowItem={borrowState} />
          </TableBody>
        </Table>
      </TableContainer>
    </BoxCustom>
  );
};

export default ActionSection;
