import { Avatar, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { TokenName } from 'crypto-token-icon';
import { BoxCustom } from 'src/components/common/BoxCustom/BoxCustom';
import ButtonLoading from 'src/components/Common/ButtonLoading/ButtonLoading';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { mapNameToInfoSolanaDevnet } from 'src/constants/tokens/solana-ecosystem/solana-devnet/mapNameToInfoSolanaDevnet';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useQueryDepositValue from 'src/hooks/useQueryDepositValue';
import { useSolanaBalanceTokens } from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { BN } from 'src/utils';
import { compactNumber } from '../../utils/format';
import SwitchCustom from './components/SwitchCustom';

export default function Deposit() {
  const { loading } = useAsyncExecute();
  const { address } = useSummarySolanaConnect();
  const { data: depositValue } = useQueryDepositValue();
  const balance = useSolanaBalanceTokens(
    address,
    Object.keys(mapNameToInfoSolana) as Array<TokenName.TRUMP | TokenName.MAX | TokenName.AI16Z>
  );

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
            {Object.values(mapNameToInfoSolanaDevnet)
              .filter((item) => item.address && balance.find((item) => BN(item.balance).isGreaterThan(0)))
              .map((row, index) => (
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
                      {compactNumber(balance[index].balance.toString())}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {depositValue?.[row.address] ?? '--'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      --
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                      <SwitchCustom _checked={true} />
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" size="small">
                      <Typography variant="body2" sx={{ fontWeight: '500' }}>
                        Deposit
                      </Typography>
                    </Button>
                    <ButtonLoading sx={{ ml: 1 }} loading={loading} size="small" variant="outlined">
                      Withdraw
                    </ButtonLoading>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxCustom>
  );
}
