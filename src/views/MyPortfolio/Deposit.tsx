import { Avatar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import SwitchCustom from './components/SwitchCustom';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';

export default function Deposit() {
  const data = [
    { id: 0, token: { symbol: 'USDC' }, inWallet: 0.44444, deposit: 0.0001, apy: 12.22, collateral: true },
    { id: 1, token: { symbol: 'USDC' }, inWallet: 0.44444, deposit: 0.0001, apy: 12.22, collateral: false },
  ];

  const tableHead = ['Asset', 'In Wallet', 'Deposit', 'APY', 'Collateral', ''];

  return (
    <BoxCustom sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Deposit
      </Typography>
      <TableContainer sx={{ bgcolor: 'background.content' }}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map((h, i) => (
                <TableCell key={i} align={i == 0 ? 'left' : 'right'}>
                  <Typography variant="caption2" sx={{ color: '#888880' }}>
                    {h}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ height: '24px', width: '24px', mr: 1.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                      {row.token.symbol}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.inWallet}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.deposit}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.apy}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <SwitchCustom _checked={row.collateral} />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" size="small">
                    <Typography variant="body2" sx={{ fontWeight: '500' }}>
                      Deposit
                    </Typography>
                  </Button>
                  <Button disabled>Withdraw</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxCustom>
  );
}
