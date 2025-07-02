import { useAppSelector } from '@/hooks/reduxHooks';
import { useGameEngine } from '@/hooks/useGameEngine/useGameEngine';
import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import { GameStateStatus } from '@/types/game.type';
import { loadGameFromStorage } from '@/utils/game.utils';
import { useNavigate } from 'react-router';

export const HomePage = () => {
  const navigate = useNavigate();
  const { startNew, resume } = useGameEngine();
  const { status } = useAppSelector(gameSliceSelectors.selectGame);
  const hasGameInStorage = !!loadGameFromStorage();

  const startNewGameHandler = () => {
    startNew();
    navigate('/game');
  };

  const resumeHandler = () => {
    resume();
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
