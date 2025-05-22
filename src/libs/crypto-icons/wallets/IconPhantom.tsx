import { SvgComponent } from '../types';
import MuiSvgIcon from '@mui/material/SvgIcon';
import { Box } from '@mui/material';
import { PNG_WALLET_Phantom } from '../constants/imagePaths';
import { useTheme } from '@mui/material/styles';

export const IconPhantom: SvgComponent = (props) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  return (
    <MuiSvgIcon {...props} titleAccess={'Phantom'} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" version="1.1" viewBox="0 0 70 70">
      <Box 
        component={'image'} 
        width="70" 
        height="70" 
        xlinkHref={isDarkMode ? PNG_WALLET_Phantom.darkmode : PNG_WALLET_Phantom.lightmode} 
        xlinkTitle={'Phantom'}
      />
    </MuiSvgIcon>
  );
};