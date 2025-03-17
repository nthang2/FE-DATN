import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, Switch, Typography } from '@mui/material';
import grey from '@mui/material/colors/grey';
import { NETWORK } from 'src/constants';
import { useCrossModeState } from 'src/states/hooks';
import { defaultBorrowValue } from 'src/views/Borrow/constant';
import { useDepositState } from 'src/views/Borrow/state/hooks';

const CrossModeSwitch = () => {
  const [crossMode, setCrossMode] = useCrossModeState();
  const [, setDepositState] = useDepositState();

  const handleChangeCrossMode = async () => {
    setCrossMode(!crossMode);
    setDepositState([defaultBorrowValue]);
  };

  if (NETWORK === 'mainnet') {
    return <></>;
  }

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Typography sx={{ borderBottom: '0.5px dashed white', lineHeight: 1.2 }}>{crossMode ? 'Cross' : 'Isolated'}</Typography>
      <Switch
        checked={crossMode}
        onChange={handleChangeCrossMode}
        checkedIcon={<CheckCircleIcon />}
        sx={(theme) => ({
          padding: 1,
          '& .MuiSwitch-switchBase': {
            transitionDuration: '300ms',
            '&.Mui-checked': {
              color: '#000',
              '& + .MuiSwitch-track': {
                opacity: 1,
                border: 0,
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
              },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              color: grey[100],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.7,
            },
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
          },
          '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: '#E9E9EA',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
              duration: 500,
            }),
            ...theme.applyStyles('dark', {
              backgroundColor: '#39393D',
            }),
          },
        })}
      />
    </Stack>
  );
};

export default CrossModeSwitch;
