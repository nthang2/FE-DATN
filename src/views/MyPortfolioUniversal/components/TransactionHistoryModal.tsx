import { CheckCircleOutline, ContentCopy, ErrorOutline, OpenInNew } from '@mui/icons-material';
import {
  Box,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { format as fd } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Failed from 'src/components/StatusData/Failed';
import JPowLoading from 'src/components/StatusData/Loading';
import NoData from 'src/components/StatusData/NoData';
import { mapNameChainId } from 'src/constants/chainId';
import { listScanLink, mapNameNetwork } from 'src/constants/network';
import useQueryTransactionsHistory from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useQueryTransactionsHistory';
import { chainIconNetwork } from 'src/states/wallets/constants/chainIcon';
import { copyTextToClipboard } from 'src/utils';
import { formatAddress } from 'src/utils/format';
import { actionType } from 'src/views/Borrow/constant';

const tableHead = ['Network', 'Action', 'Time', 'Transaction Hash', 'Status'];
export default function TransactionHistoryModal() {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const { data: transactionsHistoryData, status: statusQueryTransactionsHistory } = useQueryTransactionsHistory(page, rowsPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // const dataRender = useMemo(() => {
  //   if (transactionsHistoryData && transactionsHistoryData.actions.length > 0) {
  //     return transactionsHistoryData.actions.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
  //   } else {
  //     return [];
  //   }
  // }, [page, rowsPerPage, transactionsHistoryData]);
  return (
    <Box>
      <TableContainer
        sx={{
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {tableHead.map((header) => (
                <TableCell key={header} align="left">
                  <Typography variant="caption2" sx={{ color: 'info.main' }}>
                    {header}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {statusQueryTransactionsHistory == 'success' && transactionsHistoryData && transactionsHistoryData.actions.length > 0 ? (
              transactionsHistoryData.actions.map((row, index) => {
                const IconNetwork = chainIconNetwork[row.chainId];
                const eIndex = row.execution?.[0].message?.indexOf('Error Message')
                  ? row.execution?.[0].message?.indexOf('Error Message') + 14
                  : 0;
                return (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Stack sx={{ alignItems: 'center', gap: 1.5 }}>
                        <IconNetwork />
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disabled' }}>
                          {mapNameNetwork[mapNameChainId[row.chainId]].name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Stack sx={{ alignItems: 'center', gap: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disabled' }}>
                          {Object.entries(actionType).map(([k, v]) => {
                            if (v === row.actionType) return k;
                          })}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disable' }}>
                        {fd(row.timestamp * 1000, 'h:mm a')}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disable' }}>
                        {fd(row.timestamp * 1000, 'MMMM dd, yyy')}
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Stack sx={{ gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disable' }}>
                          {formatAddress(row.transactionHash)}
                        </Typography>
                        <ContentCopy sx={{ fontSize: '14px' }} onClick={() => copyTextToClipboard(row.transactionHash)} />
                        <Link target={'_blank'} to={`${listScanLink[mapNameChainId[row.chainId]]}/${row.transactionHash}`}>
                          <OpenInNew sx={{ fontSize: '14px' }} />
                        </Link>
                      </Stack>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Stack sx={{ alignItems: 'center', gap: 0.5 }}>
                        {row.state == 'Reverted' && (
                          <Tooltip title={row.execution ? row.execution[0]?.message?.slice(eIndex) : ''}>
                            <ErrorOutline sx={{ color: '#FFB41E' }} />
                          </Tooltip>
                        )}
                        {row.state == 'Completed' && <CheckCircleOutline sx={{ color: 'success.main' }} />}
                        <Typography variant="body2" sx={{ fontWeight: 500, color: row.state == 'Completed' ? '#08DBA4' : '#FFB41E' }}>
                          {row.state}
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell colSpan={tableHead.length}>
                  <Box className="flex-center">
                    {statusQueryTransactionsHistory == 'pending' && <JPowLoading />}
                    {statusQueryTransactionsHistory == 'error' && <Failed />}
                    {statusQueryTransactionsHistory == 'success' &&
                      transactionsHistoryData &&
                      transactionsHistoryData.actions.length == 0 && <NoData />}
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {statusQueryTransactionsHistory == 'success' && transactionsHistoryData && transactionsHistoryData.actions.length > 0 && (
        <Pagination
          className="flex-center"
          sx={{ mt: 2 }}
          page={page}
          count={Math.floor(transactionsHistoryData.numberOfActions / rowsPerPage) + 1}
          onChange={handleChangePage}
        />
      )}
    </Box>
  );
}
