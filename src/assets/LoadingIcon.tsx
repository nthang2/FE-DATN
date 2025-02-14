import { Box, BoxProps } from '@mui/material';
import LoadingSvg from 'public/svgs/LoadingSvg.gif';

const LoadingIcon = (props: BoxProps) => {
  return <Box component="img" alt="loading_svg" height={40} width={40} src={LoadingSvg} {...props} />;
};

export default LoadingIcon;
