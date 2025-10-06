import { ContentCopy } from '@mui/icons-material';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { listTokenAvailableUniversal as listTokenAvailableSol } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useMyPortfolioUniversal from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useMyPortfolioUniversal';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { useModalFunction } from 'src/states/modal/hooks';
import { BN, copyTextToClipboard } from 'src/utils';
import { compactNumber, formatNumber } from '../../utils/format';
import DepositModal from './components/DepositModal';
import WithdrawModal from './components/WithdrawModal';
import { TokenName } from 'src/libs/crypto-icons';
import { listTokenAvailable as listTokenAvailableEvm } from 'src/constants/tokens/evm-ecosystem/mapNameToInfoEthereum';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';
import { mapNameNetwork } from 'src/constants/network';
import { EthereumChainTokenInfo } from 'src/constants/tokens/evm-ecosystem/list-tokens/ethereum/EthereumChainTokenInfo';
import useGetBalanceUniversal from 'src/states/wallets/hooks/useGetBalanceUniversal';

const listSol = Object.values(listTokenAvailableSol).filter((item) => item.symbol !== TokenName.USDAI);
const listEvm = Object.values(listTokenAvailableEvm).filter((item) => item.symbol !== TokenName.USDAI);

export default function Deposit() {
  const { loading } = useAsyncExecute();
  const { address, networkName } = useSummaryFirstActiveConnect();
  const modalFunction = useModalFunction();
  const { asset, assetByTokenName } = useMyPortfolioUniversal();
  const tokens = networkName === mapNameNetwork.solana.name ? listSol : listEvm;
  const { balance } = useGetBalanceUniversal({ address, network: networkName });

  const tableHead = ['Asset', 'In Wallet', 'Deposited', ''];

  const handleDeposit = (token: SolanaEcosystemTokenInfo | EthereumChainTokenInfo) => {
    modalFunction({
      type: 'openModal',
      data: { content: <DepositModal token={token} />, title: `Deposit ${token.symbol}`, modalProps: { maxWidth: 'xs' } },
    });
  };

  const handleWithdraw = (token: SolanaEcosystemTokenInfo | EthereumChainTokenInfo) => {
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
    <BoxCustom sx={{ bgcolor: 'background.default', mt: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Deposit
      </Typography>
      <TableContainer>
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
            {tokens.map((row) => {
              if (!balance || !balance[row.symbol] || !row) return null;
              const balanceValue = balance[row.symbol];

              const balanceInWalletByUsd = BN(balanceValue)
                .multipliedBy(assetByTokenName?.[row.symbol]?.priceUSD || 0)
                .toFixed(2);
              const withdrawAbleValue = assetByTokenName?.[row.symbol]?.maxWithdrawable;
              const withdrawAblePrice = BN(assetByTokenName?.[row.symbol]?.maxWithdrawable || 0).multipliedBy(
                assetByTokenName?.[row.symbol]?.priceUSD || 0
              );

              return (
                <TableRow key={row.address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Box className="flex-start">
                      <IconToken tokenName={row.symbol} />
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', ml: 1 }}>
                        {row.symbol}
                      </Typography>
                      <ContentCopy sx={{ ml: 1 }} color="secondary" fontSize="small" onClick={() => copyTextToClipboard(row.address)} />
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {compactNumber(balanceValue.toString(), 3)}
                    </Typography>
                    <Typography variant="body3" sx={{ color: 'text.tertiary', fontSize: '10px' }}>
                      {assetByTokenName?.[row.symbol] ? '$' + balanceInWalletByUsd : '--'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {assetByTokenName?.[row.symbol] ? formatNumber(assetByTokenName?.[row.symbol]?.depositedAmount) : '--'}
                    </Typography>
                    <Typography variant="body3" sx={{ color: 'text.tertiary', fontSize: '10px' }}>
                      {assetByTokenName?.[row.symbol] ? '$' + formatNumber(assetByTokenName?.[row.symbol]?.depositedUSD) : '--'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      disabled={BN(balanceValue).isLessThanOrEqualTo(0)}
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
                      disabled={withdrawAbleValue == 0 || BN(withdrawAblePrice).isLessThan(1e-3) || asset?.[row.address] == undefined}
                    >
                      Withdraw
                    </ButtonLoading>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxCustom>
  );
}
