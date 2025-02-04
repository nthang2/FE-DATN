import { ToastNotifier } from 'src/components/ToastNotifier/ToastNotifier';
import Content from './content/Content';
import Header from './header/Header';
import ProviderSolana from 'src/components/Providers/ProviderSolana/ProviderSolana';
import { ThemeProvider } from 'src/components/Providers/ThemeProvider/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Container } from '@mui/material';

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ProviderSolana>
          <Container>
            <Header />
            <Content />
          </Container>
          <ToastNotifier />
        </ProviderSolana>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
