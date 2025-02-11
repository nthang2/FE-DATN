import { Button, ButtonProps } from '@mui/material';
import { FontOxanium } from 'src/constants';

export default function ButtonCustom(props: ButtonProps) {
  return (
    <Button
      className="button"
      variant="text"
      size="small"
      {...props}
      sx={{
        color: 'text.secondary',
        fontFamily: FontOxanium,
        borderRadius: '22px',
        boxShadow: 'none',
        textTransform: 'capitalize',
        ...props.sx,
      }}
    >
      {props.children}
    </Button>
  );
}
