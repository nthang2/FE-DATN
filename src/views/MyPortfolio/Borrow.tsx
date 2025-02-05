import { Avatar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { BoxCustom } from 'src/components/common/BoxCustom/BoxCustom';

export default function Borrow() {
  const [eMode, setEMode] = useState<boolean>(false);

  const data = [
    { id: 0, token: { symbol: 'USDC' }, available: 0.44444, yourBorrow: 0.0001, apy: 12.22 },
    { id: 1, token: { symbol: 'USDC' }, available: 0.44444, yourBorrow: 0.0001, apy: 12.22 },
  ];

  const tableHead = ['Asset', 'Available', 'your borrow', 'APY', ''];

  const handleChangeMode = () => {
    setEMode(!eMode);
  };

  return (
    <BoxCustom sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mr: 4 }}>
            Borrow
          </Typography>
          <Box sx={{ bgcolor: '#30302e', px: 1, py: 0.5, height: '24px', borderRadius: '6px' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#888880' }}>
              E-Mode {eMode ? 'On' : 'Off'}
            </Typography>
          </Box>
        </Box>
        <Button onClick={handleChangeMode} variant="outlined" size="small">
          <Typography variant="body2" sx={{ fontWeight: '500' }}>
            Change E-Mode
          </Typography>
        </Button>
      </Box>
      <TableContainer sx={{ bgcolor: 'background.content' }}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map((h, i) => (
                <TableCell align={i == 0 ? 'left' : 'right'}>
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
                    {row.available}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.yourBorrow}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.apy}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" size="small">
                    <Typography variant="body2" sx={{ fontWeight: '500' }}>
                      Borrow
                    </Typography>
                  </Button>
                  <Button disabled>Repay</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxCustom>
  );
}
