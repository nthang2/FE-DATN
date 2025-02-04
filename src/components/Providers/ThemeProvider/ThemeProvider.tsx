import { CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider as ThemeMUIProvider } from '@mui/material/styles';
import { useAtom } from 'jotai';
import { walletThemeConfig } from 'src/states/themes/state';

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = (props: Props) => {
  const { children } = props;
  const [theme] = useAtom(walletThemeConfig);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeMUIProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeMUIProvider>
    </StyledEngineProvider>
  );
};
