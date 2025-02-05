import { Skeleton } from '@mui/material';
import NAValue from 'src/components/StatusData/NAValue';
import { FetchStatus } from 'src/constants';

export default function ValueWithStatus({ status, value }: { status: FetchStatus; value?: React.ReactNode }) {
  return (
    <>
      {(status == FetchStatus.FETCHING || status == FetchStatus.IDLE) && <Skeleton variant="text" sx={{ width: '60px', height: '24px' }} />}
      {status == FetchStatus.ERROR && <NAValue />}
      {status == FetchStatus.SUCCESS && value != undefined && value}
    </>
  );
}
