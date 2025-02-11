import { Box } from '@mui/material';

const CustomMark = ({ ...props }) => {
  // console.log('🚀 ~ CustomMark ~ props:', props);
  const dataIndex = props['data-index'];
  const bgcolor = dataIndex > 1 ? '#FCFFD8' : '#666662';
  const isMaxValueMark = dataIndex === 3;

  return (
    <Box
      component="span"
      sx={{
        position: 'absolute',
        width: '2px',
        borderRadius: '1px',
        backgroundColor: 'currentColor',
        top: '50%',
        webkitTransform: 'translate(-1px, -50%)',
        mozTransform: 'translate(-1px, -50%)',
        msTransform: 'translate(-1px, -50%)',
        transform: 'translate(-1px, -50%)',
        bgcolor: bgcolor,
        height: '100%',
        display: props.markActive ? 'none' : 'block',
      }}
      {...props}
    >
      <Box position="relative" height="100%">
        {isMaxValueMark && <Box position="absolute"></Box>}
      </Box>
    </Box>
  );
};

export default CustomMark;
