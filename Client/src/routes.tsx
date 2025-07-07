import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage/HomePage';
import { GamePage } from './pages/GamePage/GamePage';
import { Layout } from '@/components/App/components';

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: '/',
        Component: HomePage,
      },
      {
        path: '/game',
        Component: GamePage,
      },
    ],
  },
]);
