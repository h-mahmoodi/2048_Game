import { useAppSelector } from '@/hooks';
import { useGameEngine } from '@/hooks/useGameEngine/useGameEngine';
import { gameSelector } from '@/store/slices/game/game.selector';
import { GameAction, GameStateStatus } from '@/types/game.type';
import { Icon } from '@/types/app.type';
import { Button } from '@/components/UI';

import { useBoardControlleresStyle } from './BoardControllers.style';

export const BoardControllers = () => {
  const { resume, pause, reset, end } = useGameEngine();
  const { status } = useAppSelector(gameSelector.game);

  const classes = useBoardControlleresStyle();

  const handleAction = (action: GameAction) => {
    switch (action) {
      case GameAction.RESUME: {
        resume();
        return;
      }
      case GameAction.PAUSE: {
        pause();
        return;
      }
      case GameAction.END: {
        end();
        return;
      }
      case GameAction.RESET: {
        reset();
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
