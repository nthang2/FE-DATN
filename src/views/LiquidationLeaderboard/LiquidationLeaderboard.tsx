import { ContentCopy } from '@mui/icons-material';
import {
  Box,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import Failed from 'src/components/StatusData/Failed';
import JPowLoading from 'src/components/StatusData/Loading';
import NoData from 'src/components/StatusData/NoData';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { getLiquidationLeaderboardData } from 'src/services/HandleApi/getLeaderboard/getLeaderboard';
import { TLiquidationLeaderboardApiResp } from 'src/services/HandleApi/getLeaderboard/type';
import { formatAddress, formatNumber } from '../../utils/format';
import { copyTextToClipboard } from '../../utils/index';
import { Input } from './components/Input';
import SortButton from './components/SortButton';
import { checkStatus, filterLiquidationConfigs, liquidationTableHead, TSortBuy } from './utils';

export interface TFilterParams {
  path: 'user' | 'collateral';
  address?: string;
  healthFactorThreshold: number;
  sortBy: TSortBuy;
  reverse: boolean;
}

export default function LiquidationLeaderboard() {
  const [liquidation, setLiquidation] = useState<{
    data: TLiquidationLeaderboardApiResp | undefined;
    status: 'success' | 'error' | 'fetching';
  }>({
    data: undefined,
    status: 'success',
  });
  const [filterParams, setFilterParams] = useState<TFilterParams>({
    path: 'user',
    address: undefined,
    healthFactorThreshold: 1.1,
    sortBy: 'healthFactor',
    reverse: false,
  });
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const getData = async () => {
    try {
      setLiquidation({ data: undefined, status: 'fetching' });
      const data = await getLiquidationLeaderboardData({
        [filterParams.path]: filterParams.address,
        healthFactorThreshold: filterParams.healthFactorThreshold,
        sortBy: filterParams.sortBy,
        reverse: filterParams.reverse,
      });
      setLiquidation({ data: data, status: 'success' });
    } catch (error) {
      setLiquidation({ data: undefined, status: 'error' });
      console.log(error);
    }
  };

  const handleChangeParams = (param: 'path' | 'address', event: { target: { value: string } }) => {
    setFilterParams({ ...filterParams, ...{ [param]: event.target.value } });
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const dataRender = useMemo(() => {
    if (liquidation.data && liquidation.data.numberOfDocs > 0) {
      return liquidation.data.docs.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
    } else {
      return [];
    }
  }, [page, rowsPerPage, liquidation.data]);

  useEffect(() => {
    if (!filterParams.address) {
      getData();
    }
    if (filterParams.address) {
      const timeout = setTimeout(() => {
        getData();
        setPage(1);
      }, 350);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams.path, filterParams.address, filterParams.reverse, filterParams.sortBy]);

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: { xs: 'inherit', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Liquidation Leaderboard
        </Typography>
        <Box className="flex-end" sx={{ mt: { xs: 4, sm: 0 } }}>
          <FormControl sx={{ m: 1 }} variant="standard">
            <Select
              labelId="path-select-label"
              id="path-select"
              value={filterParams.path}
              onChange={(e) => handleChangeParams('path', e)}
              input={<Input />}
            >
              {Object.values(filterLiquidationConfigs).map((item) => (
                <MenuItem key={item.value} value={item.value} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="body2">{item.label}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="filled">
            <Input id="demo-customized-textbox" placeholder="Address" onChange={(e) => handleChangeParams('address', e)} />
          </FormControl>
        </Box>
      </Box>
      <TableContainer sx={{ bgcolor: 'background.content', mt: 2, borderRadius: '14px', p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {liquidationTableHead.map((h, i) => (
                <TableCell key={i} align={i == 0 ? 'center' : 'right'}>
                  <Box className={clsx('flex-center', { 'flex-end': i !== 0 })}>
                    <Typography variant="caption2" sx={{ color: '#888880' }}>
                      {h.label}
                    </Typography>
                    {h.sort && <SortButton filter={h.sort} filterParams={filterParams} setFilterParams={setFilterParams} />}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {liquidation.status == 'success' && liquidation.data && liquidation.data.numberOfDocs > 0 && dataRender.length > 0 ? (
              dataRender.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" align="center">
                    {(page - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="right">
                    <Box className="flex-end">
                      <Typography sx={{ color: 'text.disabled', mr: 1 }}>{formatAddress(row.user)}</Typography>
                      <ContentCopy color="secondary" fontSize="small" onClick={() => copyTextToClipboard(row.user)} />
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box className="flex-end">
                      <Typography sx={{ color: 'text.disabled', mr: 1 }}>{findTokenInfoByToken(row.collateral)?.symbol}</Typography>
                      <ContentCopy color="secondary" fontSize="small" onClick={() => copyTextToClipboard(row.collateral)} />
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ color: 'text.disabled', fontWeight: 600 }}>{formatNumber(row.collateralAmount)}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ color: 'text.disabled', fontWeight: 600 }}>{formatNumber(row.debtAmount)}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ color: 'text.disabled', fontWeight: 600 }}>{formatNumber(row.healthFactor)}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ color: 'text.disabled' }}>{checkStatus(row.healthFactor)}</Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell colSpan={liquidationTableHead.length}>
                  <Box className="flex-center">
                    {liquidation.status == 'fetching' && <JPowLoading />}
                    {liquidation.status == 'error' && <Failed />}
                    {liquidation.status == 'success' && liquidation.data && liquidation.data.numberOfDocs == 0 && <NoData />}
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {liquidation.status == 'success' && liquidation.data && liquidation.data.numberOfDocs > 0 && (
        <Pagination
          className="flex-center"
          sx={{ mt: 2 }}
          page={page}
          count={Math.floor(liquidation.data.numberOfDocs / 5) + 1}
          onChange={handleChangePage}
        />
      )}
      {/* {liquidation.status == 'success' && liquidation.data && liquidation.data.numberOfDocs > 0 && (
        <TablePagination
          component="div"
          count={liquidation.data.numberOfDocs}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5]}
        />
      )} */}
    </Box>
  );
}
