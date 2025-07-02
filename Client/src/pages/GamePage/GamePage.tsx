import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useGameEngine } from '@/hooks/useGameEngine/useGameEngine';
import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import { Direction, GameStateStatus } from '@/types/game.type';
import { useNavigate } from 'react-router';
import { Tile } from '@/components/Tile/Tile';

export const GamePage = () => {
  const navigate = useNavigate();
  const { pause, move, reset, end } = useGameEngine();
  const game = useAppSelector(gameSliceSelectors.selectGame);
  const [isLoading, setIsLoading] = useState(true);

  const { board, status } = game;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === GameStateStatus.IDLE) {
      navigate('/');
    }
    if (status !== GameStateStatus.IDLE) {
      setIsLoading(false);
    }
  }, [board, status]);

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

  const handlePause = () => {
    pause();
    navigate('/');
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

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="App">
      <div>Status : {game.status}</div>
      <div>Score : {game.score}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          fontSize: '30px',
        }}
      >
        {board.map((row, index) => (
          <div
            key={`row-${index}`}
            style={{
              display: 'flex',
              gap: '10px',
              fontSize: '30px',
            }}
          >
            {row.map((col, index2) => (
              //   <div
              //     key={`col-${index2}`}
              //     style={{
              //       width: '80px',
              //       height: '80px',
              //       textAlign: 'center',
              //       background: col.isMerged
              //         ? 'red'
              //         : col.value === 0
              //           ? 'black'
              //           : 'green',
              //     }}
              //   >
              //     {col.value}
              //   </div>
              <Tile key={`col-${index2}`} tile={col} />
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
        {status === GameStateStatus.PLAYING && (
          <button onClick={handlePause}>Pause</button>
        )}

        <button onClick={handleReset}>Reset</button>
        <button onClick={handleEnd}>End</button>
      </div>
    </div>
  );
};
