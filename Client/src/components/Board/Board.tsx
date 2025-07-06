import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import { Tile } from './components';
import { Direction } from '@/types/game.type';
import { useGameEngine } from '@/hooks/useGameEngine/useGameEngine';

import { useBoardStyles } from './Board.style';

export const Board = () => {
  const { move, pause } = useGameEngine();
  const { board, status } = useAppSelector(gameSliceSelectors.selectGame);
  const classes = useBoardStyles();

  const handleMove = (direction: Direction) => {
    move(direction);
  };
  const handlePause = () => {
    pause();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          handleMove(Direction.RIGHT);
          break;
        case 'ArrowLeft':
          handleMove(Direction.LEFT);
          break;
        case 'ArrowUp':
          handleMove(Direction.UP);
          break;
        case 'ArrowDown':
          handleMove(Direction.DOWN);
          break;
        case 'Escape':
          handlePause();
          break;
      }
    };

    window.addEventListener('keydown', handler);

    return () => window.removeEventListener('keydown', handler);
  }, [board, status]);
  return (
    <div className={classes.Container}>
      {board.flat().map((tile) => (
        <Tile key={tile.id} tile={tile} />
      ))}
    </div>
  );
};
