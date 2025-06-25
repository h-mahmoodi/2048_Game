import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import './App.css';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { startGame } from './store/slices/game/game.slice';
import { useEffect } from 'react';

function App() {
  const game = useAppSelector(gameSliceSelectors.selectGame);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(startGame());
  }, []);
  console.log(game);

  return <div className="App">{game.status}</div>;
}
export default App;
