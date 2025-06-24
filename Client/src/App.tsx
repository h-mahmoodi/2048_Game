import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import './App.css';
import { useAppSelector } from '@/hooks/reduxHooks';

function App() {
  const game = useAppSelector(gameSliceSelectors.selectGame);
  return <div className="App">{game.status}</div>;
}
export default App;
