import { useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';
import Borrow from './views/Borrow/Borrow';
// import LiquidationLeaderboard from './views/LiquidationLeaderboard/LiquidationLeaderboard';
import MyPortfolio from './views/MyPortfolio/MyPortfolio';
import NotFound from './views/NotFound/NotFound';
import Vaults from './views/Vaults/Vaults';
// import LiquidationLeaderboard from './views/LiquidationLeaderboard/LiquidationLeaderboard';

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Borrow /> },
        { path: '/my-portfolio', element: <MyPortfolio /> },
        { path: '/vaults', element: <Vaults /> },
        // { path: '/liquidation', element: <LiquidationLeaderboard /> },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
}
