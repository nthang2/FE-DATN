import { TableContainer, Table, TableHead, TableRow, TableCell, Box, Typography, TableBody } from '@mui/material';
import ListIconToken from './ListIconToken';

const collateralTableHead = [{ label: 'Destinations', width: '250', align: 'left' }, { label: 'Allocation' }, { label: 'Percent' }];

const mockCollateralData = [
  {
    id: '1',
    name: 'Seamless USDC Vault',
    protocol: 'Morpho',
    icons: ['USDC'],
    allocation: '13,496,428.80',
    percent: '46.8%',
    isSelected: false,
  },
  {
    id: '2',
    name: 'Seamless USDC Vault',
    protocol: 'Morpho',
    icons: ['USDC'],
    allocation: '13,496,428.80',
    percent: '46.8%',
    isSelected: true,
  },
  {
    id: '3',
    name: 'Seamless USDC Vault',
    protocol: 'Morpho',
    icons: ['USDC', 'USDT'],
    allocation: '13,496,428.80',
    percent: '46.8%',
    isSelected: false,
  },
  {
    id: '4',
    name: 'Seamless USDC Vault',
    protocol: 'Morpho',
    icons: ['USDC'],
    allocation: '13,496,428.80',
    percent: '46.8%',
    isSelected: false,
  },
  {
    id: '5',
    name: 'Seamless USDC Vault',
    protocol: 'Morpho',
    icons: ['USDC'],
    allocation: '13,496,428.80',
    percent: '46.8%',
    isSelected: false,
  },
  {
    id: '6',
    name: 'Seamless USDC Vault',
    protocol: 'Morpho',
    icons: ['USDC'],
    allocation: '13,496,428.80',
    percent: '46.8%',
    isSelected: false,
  },
];

const CollateralTable = () => {
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
          {mockCollateralData.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Box className="flex-start">
                  <ListIconToken tokenNames={row.icons} network={'solana'} />
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', ml: 0.5 }}>
                    {row.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {row.allocation}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {row.percent}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollateralTable;
