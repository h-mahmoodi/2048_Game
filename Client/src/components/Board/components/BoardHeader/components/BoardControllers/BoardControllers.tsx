import { useGameEngine } from '@/hooks/useGameEngine/useGameEngine';
import { GameAction, GameStateStatus } from '@/types/game.type';
import { Icon } from '@/types/app.type';
import { Button } from '@/components/UI';

import { useBoardControlleresStyle } from './BoardControllers.style';

export const BoardControllers = () => {
  const {
    state: { status },
    resumeGame,
    pauseGameWithShowModal,
    resetGame,
    endGame,
  } = useGameEngine();

  const classes = useBoardControlleresStyle();

  const handleAction = (action: GameAction) => {
    switch (action) {
      case GameAction.RESUME: {
        resumeGame();
        return;
      }
      case GameAction.PAUSE: {
        pauseGameWithShowModal('modal pause');
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
