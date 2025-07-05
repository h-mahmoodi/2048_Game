import { useAppSelector } from '@/hooks/reduxHooks';
import { useGameEngine } from '@/hooks/useGameEngine/useGameEngine';
import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import { Direction, GameStateStatus } from '@/types/game.type';
import { useEffect } from 'react';
import { Button } from '../ui/Button/Button';
import { createUseStyles } from 'react-jss';
import type { Theme } from '@/types/theme.type';
import { Icon } from '@/types/app.type';

const useStyle = createUseStyles((theme: Theme) => ({
  Container: {
    display: 'flex',
    gap: 10,
    justifyContent: 'space-between',
  },
}));

export const BoardControllers = () => {
  const { pause, move, reset, end } = useGameEngine();
  const { board, status } = useAppSelector(gameSliceSelectors.selectGame);

  const classes = useStyle();

  const handleMove = (direction: Direction) => {
    move(direction);
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
      {status === GameStateStatus.PLAYING && (
        <Button onClick={handlePause} icon={Icon.PAUSE} />
      )}
      <Button onClick={handleReset} icon={Icon.RESET} />
      <Button onClick={handleEnd} icon={Icon.STOP} />
    </div>
  );
};
