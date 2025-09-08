import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { listWalletTableHead } from '../../constant';
// import Failed from 'src/components/StatusData/Failed';
// import JPowLoading from 'src/components/StatusData/Loading';
// import NoData from 'src/components/StatusData/NoData';
import { IconETH, IconSOL } from 'src/libs/crypto-icons';

const mockData = [
  {
    id: 1,
    name: 'Wallet 1',
    address: '0x1234567890',
    network: 'Solana',
    networkIcon: <IconSOL />,
  },
  {
    id: 2,
    name: 'Wallet 2',
    address: '0x1234567890',
    network: 'Solana',
    networkIcon: <IconSOL />,
  },
  {
    id: 3,
    name: 'Wallet 3',
    address: '0x1234567890',
    network: 'Ethereum',
    networkIcon: <IconETH />,
  },
];

const ListWallet = () => {
  return (
    <TableContainer sx={{ mt: 2, borderRadius: '14px' }}>
      <Table>
        <TableHead>
          <TableRow>
            {listWalletTableHead.map((h, i) => {
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
                <TableCell>{item.address}</TableCell>
                <TableCell>
                  <Button variant="contained" sx={{ height: '32px' }} color="secondary">
                    Remove
                  </Button>
                </TableCell>
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

export default ListWallet;
