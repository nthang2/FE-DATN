import { ContentCopy } from '@mui/icons-material';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { useNavigate } from 'react-router-dom';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import { listTokenAvailable, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useMyPortfolio from 'src/hooks/useQueryHook/queryMyPortfolio/useMyPortfolio';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import { useModalFunction } from 'src/states/modal/hooks';
import { copyTextToClipboard } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import RepayModal from './components/RepayModal';
import { useCrossModeState } from 'src/states/hooks';

export default function Borrow() {
  // const [eMode, setEMode] = useState<boolean>(false);
  const { data: depositValue } = useQueryDepositValue();
  const { data: tokensPrice } = useQueryAllTokensPrice();
  const { asset } = useMyPortfolio();
  const modalFunction = useModalFunction();
  const navigate = useNavigate();
  const [crossMode] = useCrossModeState();

  const tableHead = ['Asset', 'Available', 'USDAI Minted', ''];
  const listRow = crossMode ? { [TokenName.USDAI]: mapNameToInfoSolana[TokenName.USDAI] } : listTokenAvailable;
  // const handleChangeMode = () => {
  //   setEMode(!eMode);
  // };

  const handleRepay = (token: SolanaEcosystemTokenInfo) => {
    modalFunction({
      type: 'openModal',
      data: { content: <RepayModal token={token} />, title: `Redeem ${TokenName.USDAI}`, modalProps: { maxWidth: 'xs' } },
    });
  };

  const handleMint = (tokenId: string) => {
    navigate(`/?deposit=${tokenId}`);
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
            {Object.values(listRow).map((row) => {
              const borrowedValue = asset?.[row.address]?.usdaiToRedeem;

              return (
                <TableRow key={row.address} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Box className="flex-start">
                      <Icon tokenName={row.symbol} />
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
                            prefix: '$',
                          })
                        : '--'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {borrowedValue ? formatNumber(Number(borrowedValue), { fractionDigits: 2, prefix: '$' }) : '--'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" size="small" onClick={() => handleMint(row.address)}>
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
                      disabled={borrowedValue == 0 || !borrowedValue}
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
