import { Box, Typography, TypographyProps } from '@mui/material';
import LoadingIcon from 'src/assets/LoadingIcon';

export default function JPowLoading({
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
      <LoadingIcon sx={{ width: size, height: size }} />
      {showTitle && (
        <Typography fontWeight={500} variant="caption2" mt={1} whiteSpace={'nowrap'} {...titleProps}>
          {title}
        </Typography>
      )}
    </Box>
  );
}
