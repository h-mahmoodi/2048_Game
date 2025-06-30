import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import './App.css';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  resetGame,
  startGame,
  updateBoard,
} from './store/slices/game/game.slice';
import { useEffect } from 'react';
import {
  moveTilesToDown,
  moveTilesToLeft,
  moveTilesToRight,
  moveTilesToUp,
} from './utils/game.utils';
import { useGameEngine } from './hooks/useGameEngine/useGameEngine';
import { Direction } from './types/game.type';

function App() {
  const { startNew, pause, resume, move, reset, end } = useGameEngine();
  const game = useAppSelector(gameSliceSelectors.selectGame);

  const { board, status } = useAppSelector(gameSliceSelectors.selectGame);
  const dispatch = useAppDispatch();

  useEffect(() => {
    startNew();
  }, []);

  console.log(game);

  const handleLeftClick = () => {
    move(Direction.LEFT);
  };

  const handleRightClick = () => {
    move(Direction.RIGHT);
  };

  const handleDownClick = () => {
    move(Direction.DOWN);
  };

  const handleUpClick = () => {
    move(Direction.UP);
  };

  const handleResume = () => {
    resume();
  };

  const handlePause = () => {
    pause();
  };

  const handleEnd = () => {
    end();
  };

  const handleReset = () => {
    reset();
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
  }, [board, dispatch, status]);

  return (
    <div className="App">
      <div>Status : {game.status}</div>
      <div>Score : {game.score}</div>
      <div>
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
                  background: col.isMerged
                    ? 'red'
                    : col.value === 0
                      ? 'black'
                      : 'green',
                }}
              >
                {col.value}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        <button onClick={handleDownClick}>down</button>
        <button onClick={handleUpClick}>up</button>
      </div>
      <div>
        <button onClick={handleResume}>Resume</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleEnd}>End</button>
      </div>
    </div>
  );
}
export default App;
