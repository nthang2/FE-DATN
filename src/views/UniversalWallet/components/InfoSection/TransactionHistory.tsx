import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { format as fd } from 'date-fns';
import Failed from 'src/components/StatusData/Failed';
import JPowLoading from 'src/components/StatusData/Loading';
import NoData from 'src/components/StatusData/NoData';
import { mapNameChainId } from 'src/constants/chainId';
import { mapNameNetwork } from 'src/constants/network';
import useQueryTrasactionHistory from 'src/hooks/useQueryHook/queryUniversalWallet/useQueryTransactionHistory';
import { chainIconNetwork } from 'src/states/wallets/constants/chainIcon';
import { copyTextToClipboard } from 'src/utils';
import { formatAddress } from 'src/utils/format';
import { transactionHistoryTableHead } from '../../constant';

const TransactionHistory = () => {
  const { data: trasactionHistoryData, status: statusQueryTrasactionHistory } = useQueryTrasactionHistory();
  return (
    <TableContainer sx={{ mt: 2, borderRadius: '14px' }}>
      <Table>
        <TableHead>
          <TableRow>
            {transactionHistoryTableHead.map((h, i) => {
              return (
                <TableCell key={i} width={h.width}>
                  <Typography variant="caption2" sx={{ color: 'info.main' }}>
                    {h.label}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {statusQueryTrasactionHistory == 'success' && trasactionHistoryData && trasactionHistoryData.actions.length > 0 ? (
            trasactionHistoryData.actions.map((row, index) => {
              const IconNetwork = chainIconNetwork[row.sourceChainId];
              return (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center', gap: 1 }}>
                      <IconNetwork />
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disabled' }}>
                        {mapNameNetwork[mapNameChainId[row.sourceChainId]].name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disable' }}>
                      {row.state}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disable' }}>
                      {row.action ? 'Add' : 'Remove'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disable' }}>
                      {fd(row.timestamp * 1000, 'h:mm a')}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disable' }}>
                      {fd(row.timestamp * 1000, 'MMMM dd, YYY')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack sx={{ gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disable' }}>
                        {formatAddress(row.transactionHash)}
                      </Typography>
                      <ContentCopyIcon sx={{ fontSize: '14px' }} onClick={() => copyTextToClipboard(row.transactionHash)} />
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell colSpan={transactionHistoryTableHead.length}>
                <Box className="flex-center">
                  {statusQueryTrasactionHistory == 'pending' && <JPowLoading />}
                  {statusQueryTrasactionHistory == 'error' && <Failed />}
                  {statusQueryTrasactionHistory == 'success' && trasactionHistoryData && trasactionHistoryData.actions.length == 0 && (
                    <NoData />
                  )}
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionHistory;
