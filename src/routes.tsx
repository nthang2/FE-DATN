import { useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './views/Home/Home';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [{ path: '/', element: <Home /> }],
    },
    {
      path: '*',
      element: <div>404</div>,
    },
  ]);
}
