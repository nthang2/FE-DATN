import { Button, ButtonProps, CircularProgress } from '@mui/material';

type Props = {
  loading?: boolean;
  textLoading?: string;
} & ButtonProps;

export default function ButtonLoading({ loading, textLoading, ...muiButtonProps }: Props) {
  return (
    <Button
      {...muiButtonProps}
      startIcon={loading ? <CircularProgress /> : muiButtonProps.startIcon}
      disabled={loading || muiButtonProps.disabled}
    >
      {loading ? textLoading || 'Executing...' : muiButtonProps.children}
    </Button>
  );
}
