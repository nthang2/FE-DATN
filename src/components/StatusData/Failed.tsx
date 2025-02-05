import ClearIcon from '@mui/icons-material/Clear';
import { Box, BoxProps, SvgIconProps, Typography, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';
import { _SvgIconProps } from 'src/assets/icons';

interface FailedProps extends BoxProps {
  title?: string;
  titleProps?: TypographyProps;
  detail?: string | ReactNode;
  ErrorIcon: _SvgIconProps;
  errorIconProps?: SvgIconProps;
  children?: ReactNode;
}

export default function Failed(props: FailedProps) {
  const { title, titleProps, detail, ErrorIcon, errorIconProps, children, ...other } = props;

  return (
    <Box textAlign="center" {...other}>
      <ErrorIcon color="error" {...errorIconProps} />
      {title && (
        <Typography color="error" gutterBottom {...titleProps}>
          {title}
        </Typography>
      )}
      {detail && (
        <Typography variant="body2" color="text.secondary">
          {detail}
        </Typography>
      )}
      {children && <Box mt={1}>{children}</Box>}
    </Box>
  );
}

Failed.defaultProps = {
  ErrorIcon: ClearIcon,
  // title: 'Failed!',
};
