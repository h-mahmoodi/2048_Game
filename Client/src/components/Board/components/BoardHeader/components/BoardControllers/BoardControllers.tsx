import { useAppSelector } from '@/hooks';
import { useGameEngine } from '@/hooks/useGameEngine/useGameEngine';
import { gameSelector } from '@/store/slices/game/game.selector';
import { GameAction, GameStateStatus } from '@/types/game.type';
import { Icon } from '@/types/app.type';
import { Button } from '@/components/UI';

import { useBoardControlleresStyle } from './BoardControllers.style';

export const BoardControllers = () => {
  const { resumeGame, pauseGame, resetGame, endGame } = useGameEngine();
  const { status } = useAppSelector(gameSelector.game);

  const classes = useBoardControlleresStyle();

  const handleAction = (action: GameAction) => {
    switch (action) {
      case GameAction.RESUME: {
        resumeGame();
        return;
      }
      case GameAction.PAUSE: {
        pauseGame();
        return;
      }
      case GameAction.END: {
        endGame();
        return;
      }
      case GameAction.RESET: {
        resetGame();
        return;
      }
    }
  };

  return (
    <div className={classes.Container}>
      {status === GameStateStatus.PLAYING && (
        <Button
          onClick={() => handleAction(GameAction.PAUSE)}
          icon={Icon.PAUSE}
        />
      )}
      {status === GameStateStatus.PAUSE && (
        <Button
          onClick={() => handleAction(GameAction.RESUME)}
          icon={Icon.PLAY}
          active
        />
      )}
      <Button
        onClick={() => handleAction(GameAction.RESET)}
        icon={Icon.RESET}
      />
      <Button
        onClick={() => handleAction(GameAction.END)}
        icon={Icon.STOP}
      />
    </div>
  );
};
