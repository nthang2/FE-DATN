/* eslint-disable react-refresh/only-export-components */
import { Container } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';
import ModalCustom from 'src/components/Modals/ModalCustom';
import ProviderEVM from 'src/components/Providers/ProviderEVM/ProviderEVM';
import ProviderSolana from 'src/components/Providers/ProviderSolana/ProviderSolana';
import { ToastNotifier } from 'src/components/ToastNotifier/ToastNotifier';
import Content from './content/Content';
import Header from './header/Header';

export const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProviderEVM>
        <ProviderSolana>
          <Container>
            <Header />
            <Content />
            <ModalCustom />
            <DevTools />
          </Container>
          <ToastNotifier />
        </ProviderSolana>
      </ProviderEVM>
    </QueryClientProvider>
  );
}
