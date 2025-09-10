import { Box, Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';

const auditsTableHead = [{ label: 'Protocol', align: 'left' }, { label: '' }];

const mockAudits = [
  { id: '1', protocol: 'Tokemak' },
  { id: '2', protocol: 'Ethena' },
  { id: '3', protocol: 'Maker' },
  { id: '4', protocol: 'Sky' },
  { id: '5', protocol: 'Curve' },
];

const Audits = () => {
  return (
    <BoxCustom sx={{ bgcolor: '#000', gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" fontWeight={600}>
        Audits
      </Typography>

      <TableContainer sx={{ mt: 2, borderRadius: '14px', p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {auditsTableHead.map((h, i) => {
                return (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <TableCell key={i} align={(h?.align as any) || 'right'}>
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
            {mockAudits.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {row.protocol}
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <Button variant="contained" size="small" color="secondary" sx={{ fontSize: '14px' }}>
                    See Audits
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination sx={{ mx: 'auto' }} count={10} shape="rounded" />
    </BoxCustom>
  );
};

export default Audits;
