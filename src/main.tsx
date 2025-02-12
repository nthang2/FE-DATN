import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/Providers/ThemeProvider/ThemeProvider';
import Routes from './routes';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  </BrowserRouter>
);
