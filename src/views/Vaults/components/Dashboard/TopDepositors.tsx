import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/General/BoxCustom/BoxCustom';
import useGetTopDepositor from '../../hooks/useGetTopDepositor';
import { decimalFlood, formatAddress } from 'src/utils/format';
import { useMemo, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyTextToClipboard } from 'src/utils';
import { NumericFormat } from 'react-number-format';

const topDepositorsTableHead = [{ label: '#', align: 'left' }, { label: 'Wallet', align: 'left' }, { label: 'Staked Amount' }];

const TopDepositors = () => {
  const { data: topDepositors } = useGetTopDepositor();
  const [page, setPage] = useState(1);

  const dataRender = useMemo(() => {
    return topDepositors?.data.slice(0, 20).slice((page - 1) * 5, (page - 1) * 5 + 5);
  }, [page, topDepositors]);

  return (
    <BoxCustom sx={{ bgcolor: '#000', display: 'flex', flexDirection: 'column', py: 3 }}>
      <Typography variant="h6" fontWeight={600}>
        Top Stakers
      </Typography>

      <TableContainer sx={{ borderRadius: '14px', p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {topDepositorsTableHead.map((h, i) => {
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
            {dataRender?.map((row, index) => (
              <TableRow key={row.address}>
                <TableCell component="th" scope="row">
                  <Typography variant="body2">{index + 1 + (page - 1) * 5}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {formatAddress(row.address, 5, 6)}
                    <ContentCopyIcon sx={{ ml: 1, fontSize: '15px', cursor: 'pointer' }} onClick={() => copyTextToClipboard(row.address)} />
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {/* height 32px for sync height with Audits table*/}
                  <Box sx={{ height: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <NumericFormat
                        displayType="text"
                        value={decimalFlood(row.stakedAmount, 2)}
                        thousandSeparator={true}
                        decimalScale={2}
                        fixedDecimalScale={false}
                      />
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination sx={{ mx: 'auto' }} count={Math.ceil(20 / 5)} shape="rounded" onChange={(_, value) => setPage(value)} page={page} />
    </BoxCustom>
  );
};

export default TopDepositors;
