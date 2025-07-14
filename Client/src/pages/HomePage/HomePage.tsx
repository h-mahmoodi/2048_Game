import { useNavigate } from 'react-router';
import { useGameEngine } from '@/hooks/useGameEngine/useGameEngine';
import { loadGameFromStorage } from '@/utils/game.utils';

import { GameStateStatus } from '@/types/game.type';

export const HomePage = () => {
  const navigate = useNavigate();
  const { startNewGame, resumeGame } = useGameEngine();
  const {
    state: { status },
  } = useGameEngine();
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
