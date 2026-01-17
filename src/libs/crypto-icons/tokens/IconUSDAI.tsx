import { SvgComponent } from '../types';
import MuiSvgIcon from '@mui/material/SvgIcon';

export const IconUSDAI: SvgComponent = (props) => {
  return (
    <MuiSvgIcon
      {...props}
      titleAccess={'USDAI'}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      version="1.1"
      viewBox="0 0 70 70"
    >
      <image 
        width="70" 
        height="70" 
        href="/images/new-token.png"
        xlinkHref="/images/new-token.png"
        preserveAspectRatio="xMidYMid meet"
      />
    </MuiSvgIcon>
  );
};
