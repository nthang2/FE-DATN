import { Box } from '@mui/material';

const CustomMark = ({ ...props }) => {
  return (
    <Box
      component="span"
      sx={{
        position: 'absolute',
        width: '2px',
        'border-radius': '1px',
        'background-color': 'currentColor',
        top: '50%',
        '-webkit-transform': 'translate(-1px, -50%)',
        '-moz-transform': 'translate(-1px, -50%)',
        '-ms-transform': 'translate(-1px, -50%)',
        transform: 'translate(-1px, -50%)',
        bgcolor: '#666662',
        height: '100%',
        display: props.markActive ? 'none' : 'block',
      }}
      {...props}
    />
  );
};

export default CustomMark;
