import { Typography, TypographyProps } from '@mui/material';

export default function NAValue(props: TypographyProps) {
  return (
    <Typography
      component="span"
      variant="body2"
      {...props}
      sx={{
        px: 1,
        py: 0.1,
        lineHeight: 1,
        borderRadius: 1,
        fontSize: '1.25rem',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'text.secondary',
        ...props.sx,
      }}
    >
      --
    </Typography>
  );
}
