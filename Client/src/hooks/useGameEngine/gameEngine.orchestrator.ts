import {
  loadGameFromStorage,
  removeGameFromStorage,
  saveGameToStorage,
} from '@/utils/game.utils';
import { gameEngineActions } from './gameEngine.action';
import { useModal } from '../useModal/useModal';
import { type ModalState } from '@/types/modal.type';
import type { Direction } from '@/types/game.type';

export const gameEngineOrchestrator = () => {
  const {
    dispatchStartNewGame,
    dispatchResumeGame,
    dispatchPauseGame,
    dispatchMoveGame,
    dispatchResetGame,
    dispatchEndGame,
  } = gameEngineActions();
  const { openModal } = useModal();
  const startNewGameFlow = () => {
    removeGameFromStorage();
    const gameObject = dispatchStartNewGame();
    saveGameToStorage(gameObject);
  };

  const resumeGameFlow = () => {
    const savedGame = loadGameFromStorage();
    dispatchResumeGame(savedGame);
  };

  const pauseGameFlow = () => {
    dispatchPauseGame();
  };

  const pauseGamewithOpenFlow = (content: ModalState['content']) => {
    dispatchPauseGame();
    openModal(content);
  };

  const moveGameFlow = (direction: Direction) => {
    const gameObject = dispatchMoveGame(direction);
    if (gameObject) {
      saveGameToStorage(gameObject);
    }
  };

  const resetGameFlow = () => {
    const gameObject = dispatchResetGame();
    saveGameToStorage(gameObject);
  };

  const endGameFlow = () => {
    dispatchEndGame();
    removeGameFromStorage();
  };

  return {
    startNewGameFlow,
    resumeGameFlow,
    pauseGameFlow,
    pauseGamewithOpenFlow,
    moveGameFlow,
    resetGameFlow,
    endGameFlow,
  };
};
