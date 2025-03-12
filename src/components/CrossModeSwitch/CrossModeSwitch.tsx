import { Stack, Switch, Typography } from '@mui/material';
import { useCrossModeState } from 'src/states/hooks';
import { defaultBorrowValue } from 'src/views/Borrow/constant';
import { useDepositState } from 'src/views/Borrow/state/hooks';

const CrossModeSwitch = () => {
  const [crossMode, setCrossMode] = useCrossModeState();
  const [, setDepositState] = useDepositState();

  const handleChangeCrossMode = () => {
    setCrossMode(!crossMode);
    setDepositState([defaultBorrowValue]);
  };

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Typography>Cross Mode</Typography>
      <Switch size="medium" checked={crossMode} onChange={handleChangeCrossMode} />
    </Stack>
  );
};

export default CrossModeSwitch;
