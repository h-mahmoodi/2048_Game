import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import './App.css';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { startGame, updateBoard } from './store/slices/game/game.slice';
import { useEffect } from 'react';
import {
  moveTilesToDown,
  moveTilesToLeft,
  moveTilesToRight,
  moveTilesToUp,
} from './utils/game.utils';

function App() {
  const game = useAppSelector(gameSliceSelectors.selectGame);

  const { board } = useAppSelector(gameSliceSelectors.selectGame);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startGame());
  }, []);

  console.log(game);

  const handleLeftClick = () => {
    dispatch(updateBoard({ board: moveTilesToLeft(board) }));
  };

  const handleRightClick = () => {
    dispatch(updateBoard({ board: moveTilesToRight(board) }));
  };

  const handleDownClick = () => {
    dispatch(updateBoard({ board: moveTilesToDown(board) }));
  };

  const handleUpClick = () => {
    dispatch(updateBoard({ board: moveTilesToUp(board) }));
  };

  useEffect(() => {
    const handleMove = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          handleRightClick();
          break;
        case 'ArrowLeft':
          handleLeftClick();
          break;
        case 'ArrowUp':
          handleUpClick();
          break;
        case 'ArrowDown':
          handleDownClick();
          break;
      }
    };

    window.addEventListener('keydown', handleMove);

    return () => window.removeEventListener('keydown', handleMove);
  }, [board, dispatch]);

  return (
    <div className="App">
      {board.map((row, index) => (
        <div
          key={`row-${index}`}
          style={{
            display: 'flex',
            gap: '5px',
            fontSize: '30px',
            padding: '5px',
          }}
        >
          {row.map((col, index2) => (
            <div
              key={`col-${index2}`}
              style={{
                width: '80px',
                height: '80px',
                textAlign: 'center',
                background: col.value === 0 ? 'black' : 'green',
              }}
            >
              {col.value}
            </div>
          ))}
        </div>
      ))}
      <div>
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        <button onClick={handleDownClick}>down</button>
        <button onClick={handleUpClick}>up</button>
      </div>
    </div>
  );
}
export default App;
