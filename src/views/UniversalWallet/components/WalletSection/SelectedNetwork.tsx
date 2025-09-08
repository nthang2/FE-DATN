import { Box, Typography } from '@mui/material';
import { mapNameNetwork } from '../../network';

type IProps = {
  value: string;
};

const SelectedNetwork = (props: IProps) => {
  const { value } = props;
  const networkInfo = mapNameNetwork[value] || undefined;

  return (
    <Box
      sx={{
        height: '48px',
        px: 2,
        border: '1px solid #666662',
        borderRadius: '8px',
        bgcolor: 'secondary.dark',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: !networkInfo ? 0.5 : 1,
        gap: 1,
      }}
    >
      {!networkInfo && (
        <>
          <Box sx={{ width: '20px', height: '20px', borderRadius: '50%', bgcolor: 'text.secondary' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Network
          </Typography>
        </>
      )}

      {networkInfo && (
        <>
          {networkInfo.icon}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {networkInfo.name}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default SelectedNetwork;
