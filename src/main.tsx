import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { ThemeProvider } from './components/Providers/ThemeProvider/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  </BrowserRouter>
);
