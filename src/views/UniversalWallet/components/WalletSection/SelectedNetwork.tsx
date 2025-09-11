import { Box, Typography } from '@mui/material';
import { mapNameNetwork } from 'src/constants/network';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
        minWidth: '130px',
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
        <Box className="flex-center" alignItems="center">
          {networkInfo.icon}
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 'unset', mt: '1px', ml: 0.5 }}>
            {networkInfo.name}
          </Typography>
          <ArrowDropDownIcon sx={{ width: '18px', height: '18px' }} />
        </Box>
      )}
    </Box>
  );
};

export default SelectedNetwork;
