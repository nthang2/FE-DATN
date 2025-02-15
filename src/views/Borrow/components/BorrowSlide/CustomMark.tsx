import { Box, Typography } from '@mui/material';

const CustomMark = ({ ...props }) => {
  const dataIndex = props['data-index'];
  const isMaxValueMark = dataIndex === 3;
  const maxValue: number = props.ownerState.marks[3].value;
  const bgcolor = dataIndex > 1 ? '#FCFFD8' : '#666662';

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
        display: !isMaxValueMark ? 'none' : 'block',
      }}
      {...props}
    >
      <Box position="relative" height="100%">
        {isMaxValueMark && (
          <Box position="absolute" top={-18}>
            <Typography variant="body3">{maxValue.toFixed(2)}%</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CustomMark;
