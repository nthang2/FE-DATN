import { useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import Borrow from './views/Borrow/Borrow';
import MyPortfolio from './views/MyPortfolio/MyPortfolio';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [{ path: '/', element: <Borrow /> }],
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
