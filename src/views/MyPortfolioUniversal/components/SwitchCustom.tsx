import { Box } from '@mui/material';
import { useState } from 'react';
import { Check } from 'src/assets/icons';

export default function SwitchCustom({ _checked }: { _checked: boolean }) {
  const [checked] = useState<boolean>(_checked);

  const handleChange = () => {
    // setChecked(!checked);
  };
  return (
    <Box
      sx={{
        borderRadius: '50px',
        width: '34px',
        height: '20px',
        border: '#ffffff solid 1px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        bgcolor: checked ? '#FFD8F0' : '#35352D',
      }}
      onClick={handleChange}
    >
      <Box
        sx={{
          width: '17px',
          height: '17px',
          borderRadius: '50%',
          bgcolor: checked ? '#2D3400' : '#919283',
          transition: 'all 0.4s ease',
          transform: `translateX(${!checked ? '-4%' : '72%'})`,
          mx: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && <Check sx={{ width: '8px', height: '6px' }} />}
      </Box>
    </Box>
  );
}
