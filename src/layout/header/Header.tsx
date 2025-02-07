import { Stack } from '@mui/material';
import ConnectWalletSection from './ConnectWalletSection';
import HeaderNavbar from './HeaderNavbar';
import logo from '/images/logo.png';

export default function Header() {
  return (
    <Stack gap={2} mt={1.5} maxWidth="100vw">
      <Stack
        sx={(theme) => ({
          background: theme.palette.background.accordion,
          gap: 1,
          p: '10px',
          borderRadius: 2,
          alignItems: 'center',
          flex: 1,
        })}
      >
        <Stack sx={{ p: '6px 16px' }}>
          <img src={logo} alt="jpow_logo" width={69} height={24} />
        </Stack>

        <HeaderNavbar />
      </Stack>

      <ConnectWalletSection />
    </Stack>
  );
}
