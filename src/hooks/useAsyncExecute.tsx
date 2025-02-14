import React from 'react';
import { Id, toast } from 'react-toastify';

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

    try {
      const response = await fn(notify, idToast);
      onSuccess?.(response);
      toast.update(idToast, {
        render: 'Send transaction successful!',
        isLoading: false,
        type: 'success',
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.log(error);
      onError?.(error as Error);
      toast.update(idToast, {
        render: (error as Error).message,
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
