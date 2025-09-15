import { Box, Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import useGetAudit from '../../hooks/useGetAudit';
import { useMemo, useState } from 'react';
import SkeletonTableBody from 'src/components/TableLoading/SkeletonTableBody';

const auditsTableHead = [{ label: 'Protocol', align: 'left' }, { label: '' }];
const PAGE_SIZE = 5;

const Audits = () => {
  const { data: audits, totalItems, isLoading } = useGetAudit();
  const [page, setPage] = useState(1);

  const dataRender = useMemo(() => {
    return audits?.slice((page - 1) * PAGE_SIZE, (page - 1) * PAGE_SIZE + PAGE_SIZE);
  }, [page, audits]);

  const handleClickAudit = (auditLink: string) => {
    window.open(auditLink, '_blank');
  };

  return (
    <BoxCustom sx={{ bgcolor: '#000', display: 'flex', flexDirection: 'column', py: 3, height: '100%' }}>
      <Typography variant="h6" fontWeight={600}>
        Audits
      </Typography>

      <TableContainer sx={{ borderRadius: '14px', p: 2 }}>
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
            {isLoading ? (
              <SkeletonTableBody cols={2} rows={5} />
            ) : (
              dataRender?.map((row) => (
                <TableRow key={row.protocol}>
                  <TableCell align="left">
                    <Typography variant="body2" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                      {row.protocol}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      sx={{ fontSize: '14px' }}
                      onClick={() => handleClickAudit(row.auditLink)}
                    >
                      See Audits
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="flex-center" sx={{ flex: 1, alignItems: 'flex-end' }}>
        <Pagination
          sx={{ mx: 'auto' }}
          count={Math.ceil(totalItems / PAGE_SIZE)}
          shape="rounded"
          onChange={(_, value) => setPage(value)}
          page={page}
        />
      </Box>
    </BoxCustom>
  );
};

export default Audits;
