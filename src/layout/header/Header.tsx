import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useModeValue } from 'src/states/mode/hooks';
import { menu } from '../menu';
import ClassicConnectWallet from './ConnectWalletSection/ClassicConnectWallet';
import ConnectWalletSection from './ConnectWalletSection/ConnectWalletSection';
import HeaderNavbar from './HeaderNavbar';
import Setting from './Setting';
import logo from '/images/logo.png';

export default function Header() {
  const { isCrossMode } = useModeValue();
  const { pathname } = useLocation();
  const feature = useMemo(() => menu.find((m) => m.url?.includes(pathname)), [pathname]);
  return (
    <Stack gap={2} mt={1.5} maxWidth="100vw" sx={{ justifyContent: 'space-between' }}>
      <Stack
        sx={(theme) => ({
          background: theme.palette.background.accordion,
          gap: 1,
          p: '10px',
          borderRadius: 2,
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-between',
        })}
      >
        <Stack sx={{ alignItems: 'center', justifyContent: 'space-between', width: { xs: '100%', md: 'initial' } }}>
          <Stack sx={{ p: '6px 16px', position: 'relative' }}>
            <img src={logo} alt="jpow_logo" width={69} height={24} />
            <Typography sx={{ fontSize: '6px', position: 'absolute', bottom: 0, right: 10 }}>
              {isCrossMode ? 'Universal' : 'Classic'}
            </Typography>
          </Stack>
          <HeaderNavbar />
        </Stack>
      </Stack>
      <Stack
        sx={(theme) => ({
          background: theme.palette.background.accordion,
          p: '10px',
          borderRadius: 2,
          alignItems: 'center',
          gap: 1,
        })}
      >
        <Setting />
        {feature?.isCrossMode ? <ConnectWalletSection /> : <ClassicConnectWallet />}
      </Stack>
    </Stack>
  );
}
