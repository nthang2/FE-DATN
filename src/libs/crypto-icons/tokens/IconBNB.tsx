import { SvgComponent } from '../types';
import MuiSvgIcon from '@mui/material/SvgIcon';
import { Box } from '@mui/material';
import { PNG_BNB } from '../constants/imagePaths';
import { useTheme } from '@mui/material/styles';

export const IconBNB: SvgComponent = (props) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  return (
    <MuiSvgIcon {...props} titleAccess={'BNB'} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" version="1.1" viewBox="0 0 70 70">
      <Box 
        component={'image'} 
        width="70" 
        height="70" 
        xlinkHref={isDarkMode ? PNG_BNB.darkmode : PNG_BNB.lightmode} 
        xlinkTitle={'BNB'}
      />
    </MuiSvgIcon>
  );
};