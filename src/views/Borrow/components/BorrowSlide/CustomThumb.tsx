import { SliderThumb } from '@mui/material';
import SlideThumb from '/images/SlideThumb.png';

const CustomThumb = ({ ...props }) => (
  <SliderThumb {...props}>
    <img src={SlideThumb} alt="slider_thumb" width="30px" height="30px" />
  </SliderThumb>
);

export default CustomThumb;
