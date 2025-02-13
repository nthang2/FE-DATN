import { Skeleton } from '@mui/material';
import NAValue from 'src/components/StatusData/NAValue';

export default function ValueWithStatus({ status, value }: { status: 'pending' | 'success' | 'error'; value?: React.ReactNode }) {
  return (
    <>
      {status == 'pending' && <Skeleton variant="text" sx={{ width: '60px', height: '24px' }} />}
      {status == 'error' && <NAValue />}
      {status == 'success' && value != undefined && value}
    </>
  );
}
