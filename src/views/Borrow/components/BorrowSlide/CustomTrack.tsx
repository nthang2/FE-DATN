import { SliderTrack } from '@mui/material';
import { useMemo } from 'react';

const trackBgColor = [
  { value: 30, bgcolor: 'linear-gradient(90deg, #9CE866 0%, #34D564 100%)' },
  { value: 60, bgcolor: 'linear-gradient(90deg, #E8BA66 0%, #E0AA09 100%)' },
  { value: 100, bgcolor: 'linear-gradient(90deg, #E87E66 0%, #E02A09 100%)' },
];

const CustomTrack = ({ ...props }) => {
  const bgcolor = useMemo(() => {
    const trackWidth = props.style.width.split('%')[0];
    return trackBgColor.find((item) => item.value > Number(trackWidth))?.bgcolor;
  }, [props.style.width]);

  return <SliderTrack style={{ width: props.style.width, height: '100%', top: 0, background: bgcolor }}></SliderTrack>;
};

export default CustomTrack;
