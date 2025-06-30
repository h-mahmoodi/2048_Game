import { useAppDispatch } from '@/hooks/reduxHooks';
import { changeGameStatus } from '@/store/slices/game/game.slice';
import { GameStateStatus } from '@/types/game.type';
import { useNavigate } from 'react-router';

export const HomePage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const startNewGameHandler = () => {
    dispatch(changeGameStatus({ status: GameStateStatus.PLAYING }));
    navigate('/game');
  };

  const resumeHandler = () => {
    navigate('/game');
  };
  return (
    <div>
      <div>HomePage</div>
      <button onClick={startNewGameHandler}>Start New Game</button>
      <button onClick={resumeHandler}>Resume</button>
    </div>
  );
};
