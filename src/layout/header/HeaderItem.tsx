import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, Popover, Typography } from '@mui/material';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { TMenu } from '../menu';

const HeaderItem = (props: TMenu) => {
  const { title, url, child, parent } = props;
  const { pathname } = useLocation();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActivePage = pathname === url || (parent && parent.includes(pathname));
  if (url)
    return (
      <NavLink to={url} style={{ textDecoration: 'none' }}>
        <Button
          sx={(theme) => ({
            p: '6px 16px',
            background: isActivePage ? theme.palette.background.button : '#282825',
            color: isActivePage ? theme.palette.common.black : theme.palette.common.white,

            ':hover': {
              background: theme.palette.background.button,
              color: theme.palette.common.black,
            },
            borderRadius: '11px',
          })}
        >
          <Typography variant="body1" fontWeight={700}>
            {title}
          </Typography>
        </Button>
      </NavLink>
    );
  else
    return (
      <Box>
        <Button
          sx={(theme) => ({
            p: '6px 16px',
            background: isActivePage ? theme.palette.background.button : '#282825',
            color: isActivePage ? theme.palette.common.black : theme.palette.common.white,

            ':hover': {
              background: theme.palette.background.button,
              color: theme.palette.common.black,
            },
            borderRadius: '11px',
          })}
          onClick={handleClick}
        >
          <Typography variant="body1" fontWeight={700}>
            {title}
          </Typography>
          <KeyboardArrowDown />
        </Button>
        <Popover
          id={'popover_header'}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          sx={{ mt: 1, minWidth: '150px' }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {child &&
            child.map((c) => {
              return (
                <Box key={c.title}>
                  <NavLink to={c.url} style={{ textDecoration: 'none' }} onClick={handleClose}>
                    <Button
                      sx={(theme) => ({
                        p: '6px 16px',
                        background: pathname == c.url ? theme.palette.background.button : '#282825',
                        color: pathname == c.url ? theme.palette.common.black : theme.palette.common.white,
                        ':hover': {
                          background: theme.palette.background.button,
                          color: theme.palette.common.black,
                        },
                        borderRadius: '11px',
                        width: '100%',
                      })}
                    >
                      <Typography variant="body1" fontWeight={700}>
                        {c.title}
                      </Typography>
                    </Button>
                  </NavLink>
                </Box>
              );
            })}
        </Popover>
      </Box>
    );
};

export default HeaderItem;
