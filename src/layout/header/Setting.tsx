import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SwitchIcon } from 'src/assets/icons';
import { useModeFunction, useModeValue } from 'src/states/mode/hooks';
import { menu } from '../menu';

export default function Setting() {
  const { isCrossMode } = useModeValue();
  const modeFunction = useModeFunction();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    setIsRotated(true);
    setTimeout(() => setIsRotated(false), 600);
    if (isCrossMode) {
      modeFunction({ isCrossMode: false });
      navigate('/');
    } else {
      modeFunction({ isCrossMode: true });
      navigate('/mint-cross');
    }
  };

  useEffect(() => {
    const result = menu.find((m) => m.url?.includes(pathname));
    if (result?.isCrossMode == 'both') {
      return;
    } else if (result?.isCrossMode) {
      modeFunction({ isCrossMode: true });
    } else {
      modeFunction({ isCrossMode: false });
    }
  }, [pathname]);

  return (
    <Box
      className="flex-center"
      sx={{
        bgcolor: '#282825',
        borderRadius: '11px',
        height: '100%',
        px: 1,
        cursor: 'pointer',
        minWidth: { md: '126px' },
        gap: 1,
        border: isCrossMode ? '1px solid #919283' : 'none',
        '& .universal': {
          color: '#E2E5C2',
        },
        color: '#888880',
      }}
      onClick={handleClick}
    >
      <SwitchIcon
        className={clsx({ universal: isCrossMode })}
        sx={{
          animation: isRotated ? 'spin 0.6s linear' : 'none',
          '@keyframes spin': {
            to: { transform: 'rotate(360deg)' },
          },
        }}
      />
      <Typography variant="body2" className={clsx({ universal: isCrossMode })} sx={{ display: { xs: 'none', md: 'block' } }}>
        {isCrossMode ? 'Universal' : 'Classic'}
      </Typography>
    </Box>
  );
}
