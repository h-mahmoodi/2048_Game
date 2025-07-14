import { GameEngine } from '@/engine/GameEngine';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { gameSelector } from '@/store/slices/game/game.selector';
import {
  GameStateStatus,
  type Direction,
  type GameState,
} from '@/types/game.type';
import {
  endGameAction,
  pauseGameAction,
  resetGameAction,
  startGameAction,
  updateBoardAction,
} from '@/store/slices/game/game.slice';
import {
  loadGameFromStorage,
  removeGameFromStorage,
  saveGameToStorage,
} from '@/utils/game.utils';
import { useModal } from '../useModal/useModal';
import type { ModalState } from '@/types/modal.type';

export const useGameEngine = () => {
  const gameState = useAppSelector(gameSelector.game);
  const { board, size, status, bestScore } = gameState;
  const { openModal } = useModal();
  const dispatch = useAppDispatch();

  const gameRef = useRef<GameEngine>(new GameEngine(size));

  const startNewGame = () => {
    removeGameFromStorage();
    const game = new GameEngine(size);
    game.start();
    const gameObject = {
      board: game.getBoard(),
      score: 0,
    };
    const gameObjectForStorage: GameState = {
      board: gameObject.board,
      score: gameObject.score,
      bestScore: Math.max(bestScore, gameObject.score),
      size: size,
      status: GameStateStatus.PLAYING,
      timer: Date.now(),
    };

    dispatch(startGameAction(gameObject));
    saveGameToStorage(gameObjectForStorage);
  };

  const resumeGame = () => {
    const game = gameRef.current;
    const savedGame = loadGameFromStorage();
    if (savedGame) {
      game.start(savedGame.board);
      const gameObject = {
        board: savedGame.board,
        score: savedGame.score,
        bestScore: savedGame.bestScore,
      };

      dispatch(startGameAction(gameObject));
    } else {
      game.start(board);
      const gameObject = {
        board: game.getBoard(),
        score: game.getScore(),
      };
      dispatch(startGameAction(gameObject));
    }
  };

  const pauseGame = () => {
    dispatch(pauseGameAction());
  };

  const pauseGameWithShowModal = (content: ModalState['content']) => {
    pauseGame();
    openModal(content);
  };

  const moveGame = (direction: Direction) => {
    if (status !== GameStateStatus.PLAYING) return;
    const game = gameRef.current;
    game.start(board);
    const prevBoard = game.getBoard();
    game.move(direction);
    if (!game.hasChanged(prevBoard)) return;

    game.insertRandomTile();

    const gameObject = {
      board: game.getBoard(),
      score: game.getScore(),
      isGameOver: game.isGameOver(),
      status: game.isGameOver()
        ? GameStateStatus.GAMEOVER
        : GameStateStatus.PLAYING,
    };

    const gameObjectForStorage: GameState = {
      board: gameObject.board,
      score: gameObject.score,
      bestScore: Math.max(bestScore, gameObject.score),
      size: size,
      status: gameObject.status,
      timer: Date.now(),
    };

    dispatch(updateBoardAction(gameObject));
    saveGameToStorage(gameObjectForStorage);
  };

  const resetGame = () => {
    const game = new GameEngine(size);
    game.start();
    const gameObject = {
      board: game.getBoard(),
    };
    const gameObjectForStorage: GameState = {
      board: gameObject.board,
      score: 0,
      bestScore: 0,
      size: size,
      status: GameStateStatus.PLAYING,
      timer: Date.now(),
    };

    dispatch(resetGameAction(gameObject));
    saveGameToStorage(gameObjectForStorage);
  };

  const endGame = () => {
    dispatch(endGameAction());
    removeGameFromStorage();
  };

  return {
    state: gameState,
    startNewGame,
    pauseGame,
    pauseGameWithShowModal,
    resumeGame,
    moveGame,
    resetGame,
    endGame,
  };
};
