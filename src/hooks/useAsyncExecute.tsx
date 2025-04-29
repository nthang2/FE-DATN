import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Stack } from '@mui/material';
import React from 'react';
import { Id, toast } from 'react-toastify';
import { copyTextToClipboard } from 'src/utils';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const solScanUrl = 'https://solscan.io/tx';
interface IAsyncExecute<T> {
  fn: (notify: (msg: string) => void, idToast: Id) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export default function useAsyncExecute() {
  const [loading, setLoading] = React.useState(false);

  const asyncExecute = React.useCallback(async function <T>({ fn, onError, onSuccess }: IAsyncExecute<T>) {
    setLoading(true);

    const idToast = toast.loading('Executing...', { position: 'top-center', type: 'info' });

    function notify(msg: string) {
      toast.update(idToast, { render: msg });
    }

    const handleGoToSolScan = (hash: string | undefined) => {
      if (hash) {
        window.open(`${solScanUrl}/${hash}`);
      }
    };

    try {
      const response = await fn(notify, idToast);
      onSuccess?.(response);

      if (!response) {
        toast.dismiss(idToast);
        setLoading(false);
        return;
      }

      toast.update(idToast, {
        render: (
          <Stack alignItems="center" gap={0.5}>
            Send transaction successful!{' '}
            <OpenInNewIcon sx={{ ml: 1 }} fontSize="medium" onClick={() => handleGoToSolScan(response as string)} />
          </Stack>
        ),
        isLoading: false,
        type: 'success',
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.log(error);
      onError?.(error as Error);
      toast.update(idToast, {
        render: (
          <Stack alignItems="center" gap={0.5}>
            Executing Fail <ContentCopyIcon fontSize="medium" onClick={() => copyTextToClipboard((error as Error).message)} />
          </Stack>
        ),
        type: 'error',
        position: 'top-right',
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
      });
    }

    setLoading(false);
  }, []);

  return {
    loading,
    asyncExecute,
  };
}
