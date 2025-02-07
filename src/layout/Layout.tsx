import { Container } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProviderSolana from 'src/components/Providers/ProviderSolana/ProviderSolana';
import { ToastNotifier } from 'src/components/ToastNotifier/ToastNotifier';
import Content from './content/Content';
import Header from './header/Header';

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProviderSolana>
        <Container>
          <Header />
          <Content />
        </Container>
        <ToastNotifier />
      </ProviderSolana>
    </QueryClientProvider>
  );
}
