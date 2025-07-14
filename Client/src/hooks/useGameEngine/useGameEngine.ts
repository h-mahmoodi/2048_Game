import { useAppSelector } from '@/hooks/useRedux/useRedux';
import { gameEngineOrchestrator } from './gameEngine.orchestrator';
import { gameSelector } from '@/store/slices/game/game.selector';
import { gameEngineActions } from './gameEngine.action';

export const useGameEngine = () => {
  const gameState = useAppSelector(gameSelector.game);

  const {
    startNewGameFlow,
    resumeGameFlow,
    pauseGameFlow,
    pauseGamewithOpenFlow,
    moveGameFlow,
    resetGameFlow,
    endGameFlow,
  } = gameEngineOrchestrator();

  const {
    dispatchStartNewGame,
    dispatchResumeGame,
    dispatchPauseGame,
    dispatchMoveGame,
    dispatchResetGame,
    dispatchEndGame,
  } = gameEngineActions();

  return {
    state: gameState,
    startNewGame: startNewGameFlow,
    pauseGame: pauseGameFlow,
    pauseGameWithModal: pauseGamewithOpenFlow,
    resumeGame: resumeGameFlow,
    moveGame: moveGameFlow,
    resetGame: resetGameFlow,
    endGame: endGameFlow,
    _internalDispatch: {
      dispatchStartNewGame,
      dispatchResumeGame,
      dispatchPauseGame,
      dispatchMoveGame,
      dispatchResetGame,
      dispatchEndGame,
    },
  };
};
