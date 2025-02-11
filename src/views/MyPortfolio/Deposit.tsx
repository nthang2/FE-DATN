import { Avatar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { TokenName } from 'crypto-token-icon';
import { BoxCustom } from 'src/components/common/BoxCustom/BoxCustom';
import { mapNameToInfoSolanaDevnet } from 'src/constants/tokens/solana-ecosystem/solana-devnet/mapNameToInfoSolanaDevnet';
import { useSolanaBalanceTokens } from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import SwitchCustom from './components/SwitchCustom';

export default function Deposit() {
  const { address } = useSummarySolanaConnect();
  const balance = useSolanaBalanceTokens(
    address,
    Object.keys(mapNameToInfoSolanaDevnet) as Array<TokenName.TRUMP | TokenName.MAX | TokenName.AI16Z>
  );
  console.log('🚀 ~ Deposit ~ balance:', balance);

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
            {Object.values(mapNameToInfoSolanaDevnet).map((row, index) => (
              <TableRow key={row.address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ height: '24px', width: '24px', mr: 1.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                      {row.symbol}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {balance[index].balance.toString()}
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
