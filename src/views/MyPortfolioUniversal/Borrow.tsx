import { ContentCopy, LocalPrintshop, Redeem } from '@mui/icons-material';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import { listTokenAvailable, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useMyPortfolioUniversal from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useMyPortfolioUniversal';
import { TokenName } from 'src/libs/crypto-icons';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { useCrossModeState } from 'src/states/hooks';
import { useModalFunction } from 'src/states/modal/hooks';
import { copyTextToClipboard } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import RepayModal from './components/RepayModal';
import CrossModeRepayModal from './components/RepayModals/CrossModeRepayModal';

const tableHead = ['Asset', 'Available', 'UniUSD Minted', ''];
const listRepayableWithCollateral = [TokenName.USDC, TokenName.MAX, TokenName.SOL];

export default function Borrow() {
  const { data: depositValue } = useQueryDepositValue();
  const { data: tokensPrice } = useQueryAllTokensPrice();
  const { asset } = useMyPortfolioUniversal();
  const modalFunction = useModalFunction();
  const navigate = useNavigate();
  const [crossMode] = useCrossModeState();
  const listRow = crossMode ? { [TokenName.USDAI]: mapNameToInfoSolana[TokenName.USDAI] } : listTokenAvailable;

  const handleRepay = (token: SolanaEcosystemTokenInfo) => {
    const isRepayableWithCollateral = listRepayableWithCollateral.indexOf(token.symbol) >= 0;
    if (!isRepayableWithCollateral && !crossMode) {
      modalFunction({
        type: 'openModal',
        data: { content: <RepayModal token={token} />, title: `Redeem ${TokenName.USDAI}`, modalProps: { maxWidth: 'xs' } },
      });
      return;
    }

    modalFunction({
      type: 'openModal',
      data: { content: <CrossModeRepayModal token={token} />, title: `Redeem ${TokenName.USDAI}`, modalProps: { maxWidth: 'xs' } },
    });
  };

  const handleMint = () => {
    navigate(`/universal-borrow`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const availableMint = (row: any) => {
    if (tokensPrice && asset) {
      if (asset[row.address]?.maxAvailableToMint) {
        return asset[row.address]?.maxAvailableToMint;
      }

      const result =
        Number(depositValue?.[row.address]) * row.ratio * Number(tokensPrice[row.address]?.price ?? 1) -
        Number(asset[row.address].usdaiToRedeem);

      return result < 0 ? 0 : result;
    }

    return 0;
  };

  return (
    <BoxCustom sx={{ bgcolor: 'background.default', mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mr: 4 }}>
            Mint
          </Typography>
        </Box>
      </Box>
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
            {Object.values(listRow).map((row) => {
              const borrowedValue = asset?.[row.address]?.usdaiToRedeem;

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
                      {asset?.[row.address] && tokensPrice
                        ? formatNumber(availableMint(row), {
                            fractionDigits: 2,
                            fallback: '0',
                          })
                        : '--'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {borrowedValue ? formatNumber(Number(borrowedValue), { fractionDigits: 2, fallback: '0' }) : '--'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" size="small" onClick={() => handleMint()} startIcon={<LocalPrintshop />}>
                      <Typography variant="body2" sx={{ fontWeight: '500' }}>
                        Mint
                      </Typography>
                    </Button>
                    <Button
                      sx={{ ml: 1 }}
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        handleRepay(row);
                      }}
                      startIcon={<Redeem />}
                      // disabled={borrowedValue == 0 || !borrowedValue}
                    >
                      Redeem
                    </Button>
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
