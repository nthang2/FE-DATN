import { Box, MenuItem, SelectProps, Typography } from '@mui/material';
import CustomSelect from 'src/views/MyPortfolio/components/InputCustom/CustomSelect';
import { mapNameNetwork } from '../network';

type IProps = SelectProps & {
  options: string[];
};

const SelectedNetwork = (props: IProps) => {
  const { options, sx, ...rest } = props;
  return (
    <CustomSelect
      variant="outlined"
      sx={{
        py: 2,
        border: '1px solid #666662',
        borderRadius: '8px',
        bgcolor: 'secondary.dark',
        ...sx,
      }}
      {...rest}
    >
      {options.map((network) => {
        const networkInfo = mapNameNetwork[network];

        return (
          <MenuItem key={networkInfo.id} value={networkInfo.id}>
            <Box className="flex-start" gap={1}>
              {networkInfo.icon}
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {networkInfo.name}
              </Typography>
            </Box>
          </MenuItem>
        );
      })}
    </CustomSelect>
  );
};

export default SelectedNetwork;
