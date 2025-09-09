import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';

const topDepositorsTableHead = [{ label: '#', align: 'left' }, { label: 'Wallet', align: 'left' }, { label: 'Deposited' }];

const mockTopDepositors = [
  { id: '1', wallet: '0xe094...fa96', deposited: '2,883,264.22 USDC' },
  { id: '2', wallet: '0x3a51...91c7', deposited: '2,541,110.08 USDC' },
  { id: '3', wallet: '0x7bD2...0Ae1', deposited: '2,203,998.34 USDC' },
  { id: '4', wallet: '0x9c10...bb44', deposited: '1,990,420.10 USDC' },
  { id: '5', wallet: '0x12f0...a5d9', deposited: '1,768,205.77 USDC' },
];

const TopDepositors = () => {
  return (
    <BoxCustom sx={{ bgcolor: '#000', gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" fontWeight={600}>
        Top Depositors
      </Typography>

      <TableContainer sx={{ mt: 2, borderRadius: '14px', p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {topDepositorsTableHead.map((h, i) => {
                return (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <TableCell key={i} align={(h?.align as any) || 'right'}>
                    <Box>
                      <Typography variant="caption2" sx={{ color: 'info.main' }}>
                        {h.label}
                      </Typography>
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTopDepositors.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Typography variant="body2">{row.id}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.wallet}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {/* height 32px for sync height with Audits table*/}
                  <Box sx={{ height: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {row.deposited}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination sx={{ mx: 'auto' }} count={10} shape="rounded" />
    </BoxCustom>
  );
};

export default TopDepositors;
