import { Button, ButtonProps, CircularProgress } from '@mui/material';

type Props = {
  loading?: boolean;
  textLoading?: string;
} & ButtonProps;

export default function ButtonLoading({ loading, textLoading, ...muiButtonProps }: Props) {
  return (
    <Button
      startIcon={loading ? <CircularProgress size={18} /> : muiButtonProps.startIcon}
      disabled={loading || muiButtonProps.disabled}
      {...muiButtonProps}
    >
      {loading ? textLoading || 'Executing...' : muiButtonProps.children}
    </Button>
  );
}
