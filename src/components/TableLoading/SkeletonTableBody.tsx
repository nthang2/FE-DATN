import { TableRow, TableCell, Skeleton, SxProps } from '@mui/material';
import React from 'react';

interface IProps {
  cols?: number;
  rows?: number;
  skeletonStyle?: SxProps;
}

const SkeletonTableBody = (props: IProps) => {
  const { cols = 6, rows = 10, skeletonStyle } = props;

  return Array(rows)
    .fill(undefined)
    .map((_, index) => (
      <TableRow key={index}>
        {Array(cols)
          .fill(undefined)
          .map((_, item) => (
            <TableCell align="center" key={item}>
              <Skeleton variant="rounded" height="20px" width="100%" sx={skeletonStyle} />
            </TableCell>
          ))}
      </TableRow>
    ));
};

export default SkeletonTableBody;
