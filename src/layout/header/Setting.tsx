import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SwitchIcon } from 'src/assets/icons';
import { useUniversalModeFunction, useUniversalModeValue } from 'src/states/mode/hooks';
import { menu } from '../menu';

export default function Setting() {
  const { isUniversalMode } = useUniversalModeValue();
  const modeFunction = useUniversalModeFunction();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    setIsRotated(true);
    setTimeout(() => setIsRotated(false), 600);
    if (isUniversalMode) {
      modeFunction({ isUniversalMode: false });
      navigate('/');
    } else {
      modeFunction({ isUniversalMode: true });
      navigate('/universal-borrow');
    }
  };

  useEffect(() => {
    const result = menu.find((m) => m.url?.includes(pathname));
    if (result?.isUniversalMode == 'both') {
      return;
    } else if (result?.isUniversalMode) {
      modeFunction({ isUniversalMode: true });
    } else {
      modeFunction({ isUniversalMode: false });
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
        border: '1px solid #919283',
        '& .universal': {
          color: '#E2E5C2',
        },
        color: '#888880',
      }}
      onClick={handleClick}
    >
      <SwitchIcon
        className={clsx({ universal: isUniversalMode })}
        sx={{
          animation: isRotated ? 'spin 0.6s linear' : 'none',
          '@keyframes spin': {
            to: { transform: 'rotate(360deg)' },
          },
        }}
      />
      <Typography variant="body2" className={clsx({ universal: isUniversalMode })} sx={{ display: { xs: 'none', md: 'block' } }}>
        {isUniversalMode ? 'Universal' : 'Classic'}
      </Typography>
    </Box>
  );
}
