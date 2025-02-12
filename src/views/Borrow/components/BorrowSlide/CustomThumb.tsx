import { Box, SliderThumb } from '@mui/material';
import SlideThumb from '/images/SlideThumb.png';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const CustomThumb = ({ children, ...props }: IProps) => {
  return (
    <SliderThumb {...props}>
      {children}
      <Box
        component="img"
        src={SlideThumb}
        alt="slider_thumb"
        sx={{
          width: { xs: '42px', lg: '30px' },
          aspectRatio: 1,
        }}
      />
    </SliderThumb>
  );
};

export default CustomThumb;
