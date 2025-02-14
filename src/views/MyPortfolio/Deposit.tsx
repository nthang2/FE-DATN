import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Icon } from 'crypto-token-icon';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { listTokenAvailable, TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import { useModalFunction } from 'src/states/modal/hooks';
import { useSolanaBalanceTokens } from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { BN } from 'src/utils';
import { compactNumber, formatNumber } from '../../utils/format';
import DepositModal from './components/DepositModal';
import SwitchCustom from './components/SwitchCustom';
import WithdrawModal from './components/WithdrawModal';

export default function Deposit() {
  const { loading } = useAsyncExecute();
  const { address } = useSummarySolanaConnect();
  const { data: depositValue } = useQueryDepositValue();
  const modalFunction = useModalFunction();

  const balance = useSolanaBalanceTokens(address, Object.keys(listTokenAvailable) as Array<TSolanaToken>);

  const tableHead = ['Asset', 'In Wallet', 'Deposit', 'Collateral', ''];

  const handleDeposit = (token: SolanaEcosystemTokenInfo) => {
    modalFunction({
      type: 'openModal',
      data: { content: <DepositModal token={token} />, title: `Deposit ${token.symbol}`, modalProps: { maxWidth: 'xs' } },
    });
  };

  // const tokens = useMemo(() => {
  //   return Object.values(mapNameToInfoSolana).filter((item) => item.address && balance.find((item) => BN(item.balance).isGreaterThan(0)));
  // }, [balance]);

  const tokens = Object.values(listTokenAvailable);

  const handleWithdraw = (token: SolanaEcosystemTokenInfo) => {
    modalFunction({
      type: 'openModal',
      data: {
        content: <WithdrawModal token={token} />,
        title: `Withdraw ${token.symbol}`,
        modalProps: { maxWidth: 'xs' },
      },
    });
  };

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
                  <Typography variant="caption2" sx={{ color: 'info.main' }}>
                    {h}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.map((row, index) => (
              <TableRow key={row.address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box className="flex-start">
                    <Icon tokenName={row.symbol} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', ml: 1 }}>
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
                    {depositValue?.[row.address] ? formatNumber(depositValue?.[row.address]) : '--'}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <SwitchCustom _checked={true} />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Button
                    disabled={BN(balance[index].balance).isLessThanOrEqualTo(0)}
                    variant="contained"
                    size="small"
                    onClick={() => handleDeposit(row)}
                  >
                    <Typography variant="body2" sx={{ fontWeight: '500' }}>
                      Deposit
                    </Typography>
                  </Button>
                  <ButtonLoading
                    sx={{ ml: 1 }}
                    loading={loading}
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      handleWithdraw(row);
                    }}
                    disabled={depositValue?.[row.address] == undefined}
                  >
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
