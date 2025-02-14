import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { useNavigate } from 'react-router-dom';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import { listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryBorrowRate from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryBorrowRate';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useQueryYourBorrow from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryYourBorrow';
import { useModalFunction } from 'src/states/modal/hooks';
import { formatNumber } from 'src/utils/format';
import RepayModal from './components/RepayModal';

export default function Borrow() {
  // const [eMode, setEMode] = useState<boolean>(false);
  const { data: yourBorrow } = useQueryYourBorrow();
  const { data: borrowRate } = useQueryBorrowRate();
  const { data: depositValue } = useQueryDepositValue();
  const { data: tokensPrice } = useQueryAllTokensPrice();
  const modalFunction = useModalFunction();
  const navigate = useNavigate();

  const tableHead = ['Asset', 'Available', 'Your borrow', 'Borrow rate', ''];

  // const handleChangeMode = () => {
  //   setEMode(!eMode);
  // };

  const handleRepay = (token: SolanaEcosystemTokenInfo) => {
    modalFunction({
      type: 'openModal',
      data: { content: <RepayModal token={token} />, title: `Redeem ${TokenName.USDAI}`, modalProps: { maxWidth: 'xs' } },
    });
  };

  const handleMint = () => {
    navigate('/');
  };

  return (
    <BoxCustom sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mr: 4 }}>
            Mint
          </Typography>
          {/* <Box sx={{ bgcolor: '#30302e', px: 1, py: 0.5, height: '24px', borderRadius: '6px' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: 'info.main' }}>
              E-Mode {eMode ? 'On' : 'Off'}
            </Typography>
          </Box> */}
        </Box>
        {/* <Button onClick={handleChangeMode} variant="outlined" size="small">
          <Typography variant="body2" sx={{ fontWeight: '500' }}>
            Change E-Mode
          </Typography>
        </Button> */}
      </Box>
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
            {Object.values(listTokenAvailable).map((row) => (
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
                    {depositValue?.[row.address] && tokensPrice
                      ? formatNumber(Number(depositValue?.[row.address]) * row.ratio * Number(tokensPrice[row.address].price), {
                          fractionDigits: 2,
                          prefix: '$',
                        })
                      : '--'}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {yourBorrow?.[row.address] ? formatNumber(Number(yourBorrow?.[row.address]), { fractionDigits: 2, prefix: '$' }) : '--'}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {borrowRate?.[row.address] ? formatNumber(borrowRate?.[row.address], { fractionDigits: 2 }) : '--'}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" size="small" onClick={handleMint}>
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
                    disabled={yourBorrow?.[row.address] == undefined}
                  >
                    Redeem
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxCustom>
  );
}
