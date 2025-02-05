import { Box, CircularProgress, Typography, TypographyProps } from '@mui/material';

export default function ThornLoading({
  size = '100px',
  showTitle,
  title = 'Loading data',
  titleProps,
}: {
  size?: string;
  title?: string;
  showTitle?: boolean;
  titleProps?: TypographyProps;
}) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress sx={{ fontSize: size }} />
      {showTitle && (
        <Typography fontWeight={500} variant="caption2" mt={1} whiteSpace={'nowrap'} {...titleProps}>
          {title}
        </Typography>
      )}
    </Box>
  );
}
