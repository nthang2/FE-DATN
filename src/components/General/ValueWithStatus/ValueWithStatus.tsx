import { Skeleton } from '@mui/material';
import NAValue from 'src/components/StatusData/NAValue';

export default function ValueWithStatus({ status, value }: { status: Array<'pending' | 'success' | 'error'>; value?: React.ReactNode }) {
  return (
    <>
      {status.find((item) => item == 'pending') ? (
        <Skeleton variant="text" sx={{ width: '40px', height: '24px' }} />
      ) : status.find((item) => item == 'error') ? (
        <NAValue />
      ) : (
        value != undefined && value
      )}
    </>
  );
}
