import { Container } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ModalCustom from 'src/components/Modals/ModalCustom';
import ProviderSolana from 'src/components/Providers/ProviderSolana/ProviderSolana';
import { ToastNotifier } from 'src/components/ToastNotifier/ToastNotifier';
import Content from './content/Content';
import Header from './header/Header';

export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProviderSolana>
        <Container>
          <Header />
          <Content />
          <ModalCustom />
        </Container>
        <ToastNotifier />
      </ProviderSolana>
    </QueryClientProvider>
  );
}
