import { SliderThumb } from '@mui/material';
import SlideThumb from '/images/SlideThumb.png';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const CustomThumb = ({ children, ...props }: IProps) => {
  return (
    <SliderThumb {...props}>
      {children}
      <img src={SlideThumb} alt="slider_thumb" width="30px" height="30px" />
    </SliderThumb>
  );
};

export default CustomThumb;
