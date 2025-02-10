import { Table, TableBody, TableContainer, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';
import { useBorrowState, useDepositState } from '../../state/hooks';
import DepositTableRow from './DepositTableRow';
import BorrowTableRow from './BorrowTableRow';

interface IProps {
  isHidden: boolean;
}

const ActionSection = ({ isHidden }: IProps) => {
  const [borrowState] = useBorrowState();
  const [depositItems] = useDepositState();

  return (
    <BoxCustom p="24px 20px" hidden={isHidden}>
      <Typography variant="h6" mb={3.5}>
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
