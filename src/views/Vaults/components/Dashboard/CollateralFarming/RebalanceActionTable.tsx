import { TableContainer, Table, TableHead, TableRow, TableCell, Box, Typography, TableBody, Pagination } from '@mui/material';
import useGetRebalanceActions from 'src/views/Vaults/hooks/useGetRebalanceActions';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useMemo, useState } from 'react';
import { formatDate } from 'date-fns';
import { listActionRebalanceScanLink } from 'src/views/Vaults/constant';

const collateralTableHead = [
  { label: 'Tx Hash', align: 'left', width: '230' },
  { label: 'Amount' },
  { label: 'Action' },
  { label: 'Date' },
];
const itemPerPage = 5;

const RebalanceActionTable = () => {
  const { data } = useGetRebalanceActions();
  const [page, setPage] = useState(1);

  const displayData = useMemo(() => {
    return data?.slice((page - 1) * itemPerPage, (page - 1) * itemPerPage + itemPerPage);
  }, [page, data]);

  const handleDisplayVaultId = (vaultId: string) => {
    return vaultId.replace(/-/g, ' ').replace(/_/g, ' ');
  };

  const handleRedirectToScanLink = (chainId: string, txHash: string) => {
    const scanLink = listActionRebalanceScanLink[chainId];
    if (scanLink) {
      window.open(`${scanLink}/${txHash}`, '_blank');
    }
  };

  return (
    <TableContainer sx={{ mt: 2, borderRadius: '14px', p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {collateralTableHead.map((h, i) => {
              return (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <TableCell key={i} align={(h?.align as any) || 'right'} width={h?.width || 'auto'}>
                  <Box>
                    <Typography variant="caption2" sx={{ color: 'info.main' }}>
                      {h.label}
                    </Typography>
                  </Box>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {displayData?.map((row) => (
            <TableRow key={row.actionId}>
              <TableCell align="left">
                <Typography variant="caption" sx={{ color: 'text.disabled' }} mb={0.5}>
                  Rebalance #{row.actionId}{' '}
                  <OpenInNewIcon
                    sx={{ fontSize: '12px', cursor: 'pointer' }}
                    onClick={() => handleRedirectToScanLink(row.chainId, row.txHash)}
                  />
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                  {handleDisplayVaultId(row.vaultId)}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {row.amount.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                <Box className="flex-end">
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', ml: 0.5, textTransform: 'capitalize' }}>
                    {row.action}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {formatDate(new Date(row.timestamp * 1000), 'MM/dd/yyyy')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {formatDate(new Date(row.timestamp * 1000), 'h:mm a')}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box className="flex-center" sx={{ flex: 1, alignItems: 'flex-end', width: '100%' }}>
        <Pagination
          sx={{ mx: 'auto', mt: 2 }}
          count={Math.ceil(data?.length ? data.length / itemPerPage : 1)}
          shape="rounded"
          onChange={(_, value) => setPage(value)}
          page={page}
        />
      </Box>
    </TableContainer>
  );
};

export default RebalanceActionTable;
