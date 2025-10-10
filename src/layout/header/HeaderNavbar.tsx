import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Popover, Stack } from '@mui/material';
import React from 'react';
import { useUniversalModeValue } from 'src/states/mode/hooks';
import { menu } from '../menu';
import HeaderItem from './HeaderItem';

const HeaderNavbar = () => {
  const { isUniversalMode } = useUniversalModeValue();
  const id = 'popover_header_menu';

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
        {menu.map(
          (item) =>
            (isUniversalMode === Boolean(item.isUniversalMode) || item.isUniversalMode == 'both') && (
              <HeaderItem key={item.title} {...item} />
            )
        )}
      </Stack>
      <Stack sx={{ display: { xs: 'flex', md: 'none' }, flex: 1, justifyContent: 'flex-end' }}>
        <IconButton aria-describedby={id} onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <Popover
          id={id}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          sx={{ mt: 1 }}
        >
          <Stack
            flexDirection="column"
            sx={{
              p: 1,
              '& button': {
                width: '100%',
              },
            }}
          >
            {menu.map((item) => isUniversalMode === Boolean(item.isUniversalMode) && <HeaderItem key={item.title} {...item} />)}
          </Stack>
        </Popover>
      </Stack>
    </>
  );
};

export default HeaderNavbar;
