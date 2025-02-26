import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box } from '@mui/material';
import { SetStateAction } from 'react';
import { TFilterParams } from '../LiquidationLeaderboard';
import { TSortBuy } from '../utils';

export default function SortButton({
  filter,
  filterParams,
  setFilterParams,
}: {
  filter: TSortBuy;
  filterParams: TFilterParams;
  setFilterParams: React.Dispatch<SetStateAction<TFilterParams>>;
}) {
  const handleSort = (order: 'des' | 'asc') => {
    setFilterParams({ ...filterParams, ...{ reverse: order === 'asc' ? false : true, sortBy: filter } });
  };
  return (
    <Box sx={{ display: 'grid', ml: 0.5, '.buttonIcon': { fontSize: '14px', cursor: 'pointer' } }}>
      <ExpandLess
        className="buttonIcon"
        sx={{ color: filter == filterParams.sortBy && !filterParams.reverse ? 'text.primary' : 'text.tertiary' }}
        onClick={() => handleSort('asc')}
      />
      <ExpandMore
        className="buttonIcon"
        sx={{ color: filter == filterParams.sortBy && filterParams.reverse ? 'text.primary' : 'text.tertiary' }}
        onClick={() => handleSort('des')}
      />
    </Box>
  );
}
