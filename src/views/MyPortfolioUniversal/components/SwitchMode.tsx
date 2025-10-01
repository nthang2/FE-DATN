import { Button, Stack } from '@mui/material';
import React from 'react';
import { EdgeIcon } from 'src/assets/icons';
import { useCrossModeState } from 'src/states/hooks';
import { defaultBorrowValue } from 'src/views/Borrow/constant';
import { useDepositState } from 'src/views/Borrow/state/hooks';

const SwitchMode = () => {
  const [crossMode, setCrossMode] = useCrossModeState();
  const [, setDepositState] = useDepositState();

  const handleChangeCrossMode = async (value: boolean) => {
    if (crossMode === value) return;

    setCrossMode(value);
    setDepositState([defaultBorrowValue]);
  };

  return (
    <Stack sx={{ mb: 2, justifyContent: 'center' }}>
      <EdgeIcon sx={{ width: '16px', height: '16px' }} />
      <Stack sx={{ borderRadius: '0px 0px 24px 24px', p: 2, gap: 1, bgcolor: '#08080D' }}>
        <Button
          variant="contained"
          onClick={() => handleChangeCrossMode(true)}
          sx={{
            padding: '6px 24px',
            bgcolor: !crossMode ? 'background.selection' : '#FCFFD8',
            borderRadius: '100px',
            color: !crossMode ? '#fff' : '#2D3400',
            ':hover': {
              color: '#2D3400',
            },
          }}
        >
          Cross mode
        </Button>
      </Stack>
      <EdgeIcon sx={{ width: '16px', height: '16px', rotate: '270deg' }} />
    </Stack>
  );
};

export default SwitchMode;
