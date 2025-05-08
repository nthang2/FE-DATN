import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, Stack, Switch, Tooltip, Typography } from '@mui/material';
import grey from '@mui/material/colors/grey';
// import { NETWORK } from 'src/constants';
import { useCrossModeState } from 'src/states/hooks';
import { defaultBorrowValue } from 'src/views/Borrow/constant';
import { useBorrowSubmitState, useDepositState } from 'src/views/Borrow/state/hooks';

const CrossModeSwitch = () => {
  const [crossMode, setCrossMode] = useCrossModeState();
  const [, setDepositState] = useDepositState();
  const [isSubmitted] = useBorrowSubmitState();

  const handleChangeCrossMode = async () => {
    setCrossMode(!crossMode);
    setDepositState([defaultBorrowValue]);
  };

  // if (NETWORK === 'mainnet') {
  //   return <></>;
  // }

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Tooltip
        title={
          crossMode ? (
            <Typography>
              Multiple collateral asset in one position.{' '}
              <Link
                target="_blank"
                href={'https://www.jpow.ai/Mechanism-for-Users-1ab930c1ef038079bc0ee0da4480e156'}
                sx={{ color: 'rgb(0, 153, 255)', cursor: 'pointer', textDecoration: 'unset' }}
              >
                Read more
              </Link>
            </Typography>
          ) : (
            <Typography>
              Single collateral asset in one position.{' '}
              <Link
                target="_blank"
                href={'https://www.jpow.ai/Mechanism-for-Users-1ab930c1ef038079bc0ee0da4480e156'}
                sx={{ color: 'rgb(0, 153, 255)', cursor: 'pointer', textDecoration: 'unset' }}
              >
                Read more
              </Link>
            </Typography>
          )
        }
      >
        <Typography sx={{ borderBottom: '0.5px dashed white', lineHeight: 1.2, cursor: 'pointer' }}>
          {crossMode ? 'Cross' : 'Isolated'}
        </Typography>
      </Tooltip>
      <Switch
        checked={crossMode}
        onChange={handleChangeCrossMode}
        checkedIcon={<CheckCircleIcon />}
        disabled={isSubmitted}
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
