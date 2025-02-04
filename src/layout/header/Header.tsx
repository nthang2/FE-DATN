import { Stack } from '@mui/material';
import logo from '/images/logo.png';
import ConnectWalletSection from './ConnectWalletSection';
import HeaderItem from './HeaderItem';
import { menu } from '../menu';

export default function Header() {
  return (
    <Stack gap={2} mt={1.5}>
      <Stack
        sx={(theme) => ({
          background: theme.palette.background.accordion,
          gap: 1,
          flex: 1,
          p: '10px',
          borderRadius: 2,
          alignItems: 'center',
        })}
      >
        <Stack sx={{ p: '6px 16px' }}>
          <img src={logo} alt="jpow_logo" width={69} height={24} />
        </Stack>

        {menu.map((item) => (
          <HeaderItem key={item.title} {...item} />
        ))}
      </Stack>

      <ConnectWalletSection />
    </Stack>
  );
}
