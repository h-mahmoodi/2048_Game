import { GameEngine } from '@/engine/GameEngine';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { gameSelector } from '@/store/slices/game/game.selector';
import {
  GameStateStatus,
  type Direction,
  type GameState,
} from '@/types/game.type';
import {
  endGame,
  pauseGame,
  resetGame,
  startGame,
  updateBoard,
} from '@/store/slices/game/game.slice';
import {
  loadGameFromStorage,
  removeGameFromStorage,
  saveGameToStorage,
} from '@/utils/game.utils';
import { useNavigate } from 'react-router';

export const useGameEngine = () => {
  const gameState = useAppSelector(gameSelector.game);

  const { board, size, status, bestScore } = gameState;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const gameRef = useRef<GameEngine>(new GameEngine(size));

  const startNew = () => {
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

    dispatch(startGame(gameObject));
    saveGameToStorage(gameObjectForStorage);
  };

  const resume = () => {
    const game = gameRef.current;
    const savedGame = loadGameFromStorage();
    if (savedGame) {
      game.start(savedGame.board);
      const gameObject = {
        board: savedGame.board,
        score: savedGame.score,
        bestScore: savedGame.bestScore,
      };

      dispatch(startGame(gameObject));
    } else {
      game.start(board);
      const gameObject = {
        board: game.getBoard(),
        score: game.getScore(),
      };
      dispatch(startGame(gameObject));
    }
  };

  const pause = () => {
    dispatch(pauseGame());
    // navigate('/');
  };

  const move = (direction: Direction) => {
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

    dispatch(updateBoard(gameObject));
    saveGameToStorage(gameObjectForStorage);
  };

  const reset = () => {
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

    dispatch(resetGame(gameObject));
    saveGameToStorage(gameObjectForStorage);
  };

  const end = () => {
    dispatch(endGame());
    removeGameFromStorage();
  };

  return { startNew, pause, resume, move, reset, end };
};
