import { Slider, SliderProps } from '@mui/material';
import CustomRail from './CustomRail';

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
];

const CustomSlider = (props: SliderProps) => {
  return (
    <Slider
      marks={marks}
      color="primary"
      {...props}
      slots={{
        rail: CustomRail,
      }}
      sx={{
        '& .MuiSlider-rail': {
          bgcolor: 'primary.main',
        },
        '& .MuiSlider-mark': {
          bgcolor: 'transparent',
        },
        '& .MuiSlider-thumb': {
          bgcolor: '#35352d',
          boxShadow: 'none',
        },
        '& .MuiSlider-thumb::before': {
          boxShadow: 'none',
        },
        ...props.sx,
      }}
    />
  );
};

export default CustomSlider;
