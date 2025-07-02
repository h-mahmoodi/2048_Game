import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage/HomePage';
import { GamePage } from './pages/GamePage/GamePage';
import { AppLayout } from './components/AppLayout/AppLayout';

export const router = createBrowserRouter([
  {
    Component: AppLayout,
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
