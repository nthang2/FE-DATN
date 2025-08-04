import { ContentCopy } from '@mui/icons-material';
import {
  Avatar,
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
import { findTokenInfoByToken, listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { usdcSolanaMainnet } from 'src/constants/tokens/solana-ecosystem/solana-mainnet';
import { getLiquidationLeaderboardData } from 'src/services/HandleApi/getLeaderboard/getLeaderboard';
import { TLiquidationLeaderboardApiResp } from 'src/services/HandleApi/getLeaderboard/type';
import { formatAddress, formatNumber } from '../../utils/format';
import { copyTextToClipboard } from '../../utils/index';
import { Input } from './components/Input';
import { checkStatus, liquidationTableHead, TSortBuy } from './utils';
import { TableSortLabel } from '@mui/material';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';

export interface TFilterParams {
  collateral?: string;
  user?: string;
  healthFactorThreshold: number;
  sortBy: TSortBuy;
  reverse: boolean;
}

export default function LeaderboardTable() {
  const [liquidation, setLiquidation] = useState<{
    data: TLiquidationLeaderboardApiResp | undefined;
    status: 'success' | 'error' | 'fetching';
  }>({
    data: undefined,
    status: 'success',
  });
  const [filterParams, setFilterParams] = useState<TFilterParams>({
    collateral: 'all',
    user: undefined,
    healthFactorThreshold: 1.15,
    sortBy: 'healthFactor',
    reverse: false,
  });
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const getData = async () => {
    try {
      setLiquidation({ data: undefined, status: 'fetching' });
      const data = await getLiquidationLeaderboardData({
        collateral: filterParams.collateral == 'all' ? undefined : filterParams.collateral,
        user: filterParams.user,
        healthFactorThreshold: filterParams.healthFactorThreshold,
        sortBy: filterParams.sortBy,
        reverse: filterParams.reverse,
        excludeCollateral: usdcSolanaMainnet.address,
      });
      setLiquidation({ data: data, status: 'success' });
    } catch (error) {
      setLiquidation({ data: undefined, status: 'error' });
      console.log(error);
    }
  };

  const dataRender = useMemo(() => {
    if (liquidation.data && liquidation.data.numberOfDocs > 0) {
      return liquidation.data.docs.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
    } else {
      return [];
    }
  }, [page, rowsPerPage, liquidation.data]);

  const collateralTokens = useMemo(() => {
    const tokens = [{ symbol: 'All Collateral', address: 'all' }];
    Object.values(listTokenAvailable)
      .filter((item) => item.symbol !== 'USDC')
      .forEach((item) => {
        tokens.push(item);
      });
    return tokens;
  }, []);

  const handleChangeParams = (param: 'collateral' | 'user', event: { target: { value: string } }) => {
    setFilterParams({ ...filterParams, ...{ [param]: event.target.value } });
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleSort = (currSortDir: boolean, filter: TSortBuy | undefined) => {
    if (filter) {
      setFilterParams({ ...filterParams, ...{ reverse: !currSortDir, sortBy: filter } });
    }
  };

  useEffect(() => {
    if (!filterParams.user) {
      getData();
    }
    if (filterParams.user) {
      const timeout = setTimeout(() => {
        getData();
        setPage(1);
      }, 350);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams.collateral, filterParams.user, filterParams.reverse, filterParams.sortBy]);

  return (
    <BoxCustom>
      <Box sx={{ display: { xs: 'inherit', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Liquidation Leaderboard
        </Typography>
        <Box
          className="flex-end"
          sx={{ mt: { xs: 4, sm: 0 }, flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'normal', sm: 'center' } }}
        >
          <FormControl sx={{ m: 1 }} variant="standard">
            <Select
              labelId="path-select-label"
              id="path-select"
              value={filterParams.collateral}
              onChange={(e) => handleChangeParams('collateral', e)}
              input={<Input />}
            >
              {collateralTokens.map((item) => (
                <MenuItem key={item.symbol} value={item.address} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="body2">{item.symbol}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="filled">
            <Input id="search-user-address" placeholder="User Address" onChange={(e) => handleChangeParams('user', e)} />
          </FormControl>
        </Box>
      </Box>
      <TableContainer sx={{ mt: 2, borderRadius: '14px', p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {liquidationTableHead.map((h, i) => {
                const isActive = h.sort && filterParams.sortBy === h.sort;
                const currDir = filterParams.reverse ? true : false;
                const iconDirection = filterParams.sortBy === h.sort && filterParams.reverse ? 'desc' : 'asc';

                return (
                  <TableCell key={i} align={i <= 1 ? 'left' : 'right'} width={h.width}>
                    <Box className={clsx('flex-end', { 'flex-start': i <= 1 })}>
                      <Typography variant="caption2" sx={{ color: 'info.main' }}>
                        {h.label}
                      </Typography>
                      {h.sort && (
                        <TableSortLabel
                          active={isActive}
                          hidden={false}
                          direction={iconDirection}
                          onClick={() => handleSort(currDir, h.sort)}
                          sx={{ '& svg': { opacity: '1 !important' }, color: isActive ? '#fff' : 'text.tertiary' }}
                        />
                      )}
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {liquidation.status == 'success' && liquidation.data && liquidation.data.numberOfDocs > 0 && dataRender.length > 0 ? (
              dataRender.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" align="left">
                    {(page - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="left" width={200}>
                    <Box className="flex-start">
                      <Typography sx={{ color: 'text.disabled', mr: 1 }}>{formatAddress(row.user)}</Typography>
                      <ContentCopy color="secondary" fontSize="small" onClick={() => copyTextToClipboard(row.user)} />
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box className="flex-end">
                      <Typography sx={{ color: 'text.disabled' }}>{findTokenInfoByToken(row.collateral)?.symbol}</Typography>
                      {/* <ContentCopy color="secondary" fontSize="small" onClick={() => copyTextToClipboard(row.collateral)} /> */}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box className="flex-end">
                      <Typography sx={{ color: 'text.disabled', fontWeight: 600, mr: 1 }}>{formatNumber(row.collateralAmount)}</Typography>
                      <Avatar src={row.collateralImageUrl} sx={{ height: '16px', width: '16px' }} />
                      {/* <Typography sx={{ color: 'text.disabled' }}>{findTokenInfoByToken(row.collateral)?.symbol}</Typography> */}
                      {/* <ContentCopy color="secondary" fontSize="small" onClick={() => copyTextToClipboard(row.collateral)} /> */}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ color: 'text.disabled', fontWeight: 600 }}>
                      {formatNumber(row.collateralValue, { fractionDigits: 2, prefix: '$' })}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ color: 'text.disabled', fontWeight: 600 }}>
                      {formatNumber(row.debtAmount, { fractionDigits: 2, prefix: '$' })}
                    </Typography>
                  </TableCell>
                  {/* <TableCell align="right">
                    <Typography sx={{ color: 'text.disabled', fontWeight: 600 }}>{formatNumber(row.collateralToClaim)}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ color: 'text.disabled', fontWeight: 600 }}>{formatNumber(row.repayAmount)}</Typography>
                  </TableCell> */}
                  <TableCell align="right">
                    <Typography sx={{ fontWeight: 600, color: checkStatus(row.healthFactor).color }}>
                      {formatNumber(row.healthFactor)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography sx={{ color: 'text.disabled', fontWeight: 600 }}>
                      {formatNumber(row.liquidationPrice, { fractionDigits: 6, prefix: '$' })}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ minWidth: '112px' }}>
                    <Typography sx={{ color: checkStatus(row.healthFactor).color }}>{checkStatus(row.healthFactor).text}</Typography>
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
          count={Math.floor(liquidation.data.numberOfDocs / rowsPerPage) + 1}
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
    </BoxCustom>
  );
}
