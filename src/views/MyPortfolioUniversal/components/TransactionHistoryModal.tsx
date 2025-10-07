import { Box, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import Failed from 'src/components/StatusData/Failed';
import JPowLoading from 'src/components/StatusData/Loading';
import NoData from 'src/components/StatusData/NoData';
import { mapNameChainId } from 'src/constants/chainId';
import { mapNameNetwork } from 'src/constants/network';
import useQueryTrasactionsHistory from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useQueryTransactionsHistory';
import { chainIconNetwork } from 'src/states/wallets/constants/chainIcon';
import { actionType } from 'src/views/Borrow/constant';

const tableHead = ['Network', 'Status', 'Action', 'Initiated At', 'Wallet Address'];
export default function TransactionHistoryModal() {
  const { data: transactionsHistoryData, status: statusQueryTrasactionsHistory } = useQueryTrasactionsHistory();

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const dataRender = useMemo(() => {
    if (transactionsHistoryData && transactionsHistoryData.actions.length > 0) {
      return transactionsHistoryData.actions.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
    } else {
      return [];
    }
  }, [page, rowsPerPage, transactionsHistoryData]);
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
            {statusQueryTrasactionsHistory == 'success' &&
            transactionsHistoryData &&
            transactionsHistoryData.actions.length > 0 &&
            dataRender.length > 0 ? (
              dataRender.map((row, index) => {
                const IconNetwork = chainIconNetwork[row.chainId];
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
                      <Stack sx={{ alignItems: 'center', gap: 1.5 }}>
                        <IconNetwork />
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disabled' }}>
                          {mapNameNetwork[mapNameChainId[row.chainId]].name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Stack sx={{ alignItems: 'center', gap: 1.5 }}>
                        <IconNetwork />
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.disabled' }}>
                          {mapNameNetwork[mapNameChainId[row.chainId]].name}
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
                    {statusQueryTrasactionsHistory == 'pending' && <JPowLoading />}
                    {statusQueryTrasactionsHistory == 'error' && <Failed />}
                    {statusQueryTrasactionsHistory == 'success' &&
                      transactionsHistoryData &&
                      transactionsHistoryData.actions.length == 0 && <NoData />}
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {statusQueryTrasactionsHistory == 'success' && transactionsHistoryData && transactionsHistoryData.actions.length > 0 && (
        <Pagination
          className="flex-center"
          sx={{ mt: 2 }}
          page={page}
          count={Math.floor(transactionsHistoryData.actions.length / rowsPerPage) + 1}
          onChange={handleChangePage}
        />
      )}
    </Box>
  );
}
