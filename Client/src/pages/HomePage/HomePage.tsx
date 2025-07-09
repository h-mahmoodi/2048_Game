import { useNavigate } from 'react-router';
import { useAppSelector } from '@/hooks';
import { useGameEngine } from '@/hooks/useGameEngine/useGameEngine';
import { gameSelector } from '@/store/slices/game/game.selector';
import { loadGameFromStorage } from '@/utils/game.utils';

import { GameStateStatus } from '@/types/game.type';

export const HomePage = () => {
  const navigate = useNavigate();
  const { startNewGame, resumeGame } = useGameEngine();
  const { status } = useAppSelector(gameSelector.game);
  const hasGameInStorage = !!loadGameFromStorage();

  const startNewGameHandler = () => {
    startNewGame();
    navigate('/game');
  };

  const resumeHandler = () => {
    resumeGame();
    navigate('/game');
  };

  return (
    <div>
      <div>HomePage</div>
      <button onClick={startNewGameHandler}>Start New Game</button>
      {(status === GameStateStatus.PAUSE || hasGameInStorage) && (
        <button onClick={resumeHandler}>Resume</button>
      )}
    </div>
  );
};
