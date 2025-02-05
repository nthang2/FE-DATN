import { useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './views/Home/Home';
import MyPortfolio from './views/MyPortfolio/MyPortfolio';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [{ path: '/', element: <Home /> }],
    },
    {
      path: '/my-portfolio',
      element: <Layout />,
      children: [{ path: '/my-portfolio', element: <MyPortfolio /> }],
    },
    {
      path: '*',
      element: <div>404</div>,
    },
  ]);
}
