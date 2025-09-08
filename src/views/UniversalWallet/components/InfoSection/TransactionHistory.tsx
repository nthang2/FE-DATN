import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { IconETH, IconSOL } from 'src/libs/crypto-icons';
import { transactionHistoryTableHead } from '../../constant';

const mockData = [
  {
    id: 1,
    date: '2021-01-01',
    status: 'success',
    network: 'Solana',
    networkIcon: <IconSOL />,
    walletAddress: '0x1234567890',
    action: 'Create',
  },
  {
    id: 2,
    date: '2021-02-03',
    status: 'failed',
    network: 'Ethereum',
    networkIcon: <IconETH />,
    walletAddress: '0x1234567890',
    action: 'Create',
  },
  {
    id: 3,
    date: '2021-03-04',
    status: 'pending',
    network: 'Solana',
    networkIcon: <IconSOL />,
    walletAddress: '0x1234567890',
    action: 'Remove',
  },
];

const TransactionHistory = () => {
  return (
    <TableContainer sx={{ mt: 2, borderRadius: '14px' }}>
      <Table>
        <TableHead>
          <TableRow>
            {transactionHistoryTableHead.map((h, i) => {
              return (
                <TableCell key={i} width={h.width}>
                  <Typography variant="caption2" sx={{ color: 'info.main' }}>
                    {h.label}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {mockData.length > 0 ? (
            mockData.map((item) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Box className="flex-start" gap={1}>
                    {item.networkIcon}
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.network}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.action}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.walletAddress}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {/* <TableCell colSpan={liquidationTableHead.length}>
            <Box className="flex-center">
              {liquidation.status == 'fetching' && <JPowLoading />}
              {liquidation.status == 'error' && <Failed />}
              {liquidation.status == 'success' && liquidation.data && liquidation.data.numberOfDocs == 0 && <NoData />}
            </Box>
          </TableCell> */}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionHistory;
