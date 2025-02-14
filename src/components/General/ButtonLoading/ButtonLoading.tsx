import { Button, ButtonProps } from '@mui/material';
import LoadingIcon from 'src/assets/LoadingIcon';

type Props = {
  loading?: boolean;
  textLoading?: string;
} & ButtonProps;

export default function ButtonLoading({ loading, textLoading, ...muiButtonProps }: Props) {
  return (
    <Button
      startIcon={loading ? <LoadingIcon /> : muiButtonProps.startIcon}
      disabled={loading || muiButtonProps.disabled}
      {...muiButtonProps}
    >
      {loading ? textLoading || 'Executing...' : muiButtonProps.children}
    </Button>
  );
}
