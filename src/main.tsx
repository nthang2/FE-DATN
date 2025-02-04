import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);
