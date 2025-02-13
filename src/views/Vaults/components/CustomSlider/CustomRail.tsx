import { SliderRail } from '@mui/material';

const CustomRail = ({ ...props }) => {
  return <SliderRail {...props} style={{ height: 'unset', borderTop: '3px dashed  #323326' }}></SliderRail>;
};

export default CustomRail;
