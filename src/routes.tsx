import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from './layout/Layout';

const UniversalWallet = lazy(() => import('./views/UniversalWallet/UniversalWallet'));
const Borrow = lazy(() => import('./views/Borrow/Borrow'));
const BorrowCrossChain = lazy(() => import('./views/BorrowCrossChain/BorrowCrossChain'));
const MyPortfolio = lazy(() => import('./views/MyPortfolio/MyPortfolio'));
const NotFound = lazy(() => import('./views/NotFound/NotFound'));
const Vaults = lazy(() => import('./views/Vaults/Vaults'));
const LiquidationLeaderboard = lazy(() => import('./views/LiquidationLeaderboard/LiquidationLeaderboard'));
const SwapToken = lazy(() => import('./views/SwapToken/SwapToken'));

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Borrow /> },
        { path: '/mint-cross', element: <BorrowCrossChain /> },
        { path: '/my-portfolio', element: <MyPortfolio /> },
        { path: '/earn', element: <Vaults /> },
        { path: '/liquidation', element: <LiquidationLeaderboard /> },
        { path: '/convert', element: <SwapToken /> },
        { path: '/universal-wallet', element: <UniversalWallet /> },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
}
