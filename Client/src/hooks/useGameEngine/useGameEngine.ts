import { GameEngine } from '@/engine/GameEngine';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { gameSliceSelectors } from '@/store/slices/game/game.selector';
import { GameStateStatus, type Direction } from '@/types/game.type';
import {
  endGame,
  pauseGame,
  resetGame,
  startGame,
  updateBoard,
} from '@/store/slices/game/game.slice';

export const useGameEngine = () => {
  const { board, size, status } = useAppSelector(
    gameSliceSelectors.selectGame
  );

  const dispatch = useAppDispatch();

  const gameRef = useRef<GameEngine>(new GameEngine(size));

  const startNew = () => {
    const game = new GameEngine(size);
    game.start();
    const gameObject = {
      board: game.getBoard(),
      score: game.getScore(),
    };
    dispatch(startGame(gameObject));
  };

  const resume = () => {
    const game = new GameEngine(size);
    game.start(board);
    const gameObject = {
      board: game.getBoard(),
      score: game.getScore(),
    };
    dispatch(startGame(gameObject));
  };

  const pause = () => {
    dispatch(pauseGame());
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
    };

    dispatch(updateBoard(gameObject));
  };

  const reset = () => {
    const game = new GameEngine(size);
    game.start();
    const gameObject = {
      board: game.getBoard(),
    };
    dispatch(resetGame(gameObject));
  };

  return { startNew, pause, resume, move, reset };
};
