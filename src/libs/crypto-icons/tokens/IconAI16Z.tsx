import { SvgComponent } from '../types';
import MuiSvgIcon from '@mui/material/SvgIcon';
import { Box } from '@mui/material';
import { PNG_AI16Z } from '../constants/imagePaths';
import { useTheme } from '@mui/material/styles';

export const IconAI16Z: SvgComponent = (props) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  return (
    <MuiSvgIcon {...props} titleAccess={'AI16Z'} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" version="1.1" viewBox="0 0 70 70">
      <Box 
        component={'image'} 
        width="70" 
        height="70" 
        xlinkHref={isDarkMode ? PNG_AI16Z.darkmode : PNG_AI16Z.lightmode} 
        xlinkTitle={'AI16Z'}
      />
    </MuiSvgIcon>
  );
};