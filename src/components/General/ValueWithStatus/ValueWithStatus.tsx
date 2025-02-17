import { Box, Skeleton, SxProps } from '@mui/material';
import NAValue from 'src/components/StatusData/NAValue';

interface IProps {
  status: Array<'pending' | 'success' | 'error'>;
  value?: React.ReactNode;
  skeletonStyle?: SxProps;
}

export default function ValueWithStatus({ status, value, skeletonStyle }: IProps) {
  return (
    <Box className="flex-center">
      {status.find((item) => item == 'pending') ? (
        <Skeleton variant="text" sx={{ width: '60px', height: '24px', ...skeletonStyle }} />
      ) : status.find((item) => item == 'error') ? (
        <NAValue />
      ) : (
        value != undefined && value
      )}
    </Box>
  );
}
