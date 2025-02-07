import { IconButton, Popover, Stack } from '@mui/material';
import { menu } from '../menu';
import HeaderItem from './HeaderItem';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

const HeaderNavbar = () => {
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
        {menu.map((item) => (
          <HeaderItem key={item.title} {...item} />
        ))}
      </Stack>

      <Stack sx={{ display: { xs: 'flex', md: 'none' }, flex: 1, justifyContent: 'flex-end' }}>
        <IconButton onClick={handleClick}>
          <MenuIcon />
        </IconButton>

        <Popover
          id={'popover_header'}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
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
            {menu.map((item) => (
              <HeaderItem key={item.title} {...item} />
            ))}
          </Stack>
        </Popover>
      </Stack>
    </>
  );
};

export default HeaderNavbar;
