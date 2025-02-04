import { Button, Typography } from '@mui/material';
import { TMenu } from '../menu';
import { NavLink, useLocation } from 'react-router-dom';

const HeaderItem = (props: TMenu) => {
  const { title, url } = props;
  const { pathname } = useLocation();

  const isActivePage = pathname === url;

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
};

export default HeaderItem;
