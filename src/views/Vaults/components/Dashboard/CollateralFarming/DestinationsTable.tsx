import { TableContainer, Table, TableHead, TableRow, TableCell, Box, Typography, TableBody } from '@mui/material';
import ListIconToken from '../ListIconToken';
import useGetVaultPosition from 'src/views/Vaults/hooks/useGetVaultPosition';
import SkeletonTableBody from 'src/components/TableLoading/SkeletonTableBody';

const collateralTableHead = [{ label: 'Destinations', width: '250', align: 'left' }, { label: 'Allocation' }, { label: 'Percent' }];

const DestinationsTable = () => {
  const { data, isLoading } = useGetVaultPosition();
  const listVaultPositions = data?.vaultPositions || [];

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
          {isLoading ? (
            <SkeletonTableBody cols={3} rows={3} />
          ) : (
            listVaultPositions?.map?.((row) => (
              <TableRow key={row.vaultId}>
                <TableCell component="th" scope="row">
                  <Box className="flex-start">
                    <ListIconToken tokenNames={[row.depositToken]} network={'solana'} protocol={row.vaultId} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', ml: 0.5 }}>
                      {row.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.tvl.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.percentage.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DestinationsTable;
