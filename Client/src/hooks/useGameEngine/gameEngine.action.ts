import { GameEngine } from '@/engine/GameEngine';
import { useAppDispatch, useAppSelector } from '../useRedux/useRedux';
import { gameSelector } from '@/store/slices/game/game.selector';
import {
  Direction,
  GameStateStatus,
  type GameState,
} from '@/types/game.type';
import {
  endGameAction,
  pauseGameAction,
  resetGameAction,
  startGameAction,
  updateBoardAction,
} from '@/store/slices/game/game.slice';
import { useRef } from 'react';

export const gameEngineActions = () => {
  const { board, size, status, bestScore } = useAppSelector(
    gameSelector.game
  );
  const dispatch = useAppDispatch();
  const gameRef = useRef<GameEngine>(new GameEngine(size));

  const dispatchStartNewGame = (): GameState => {
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
    return gameObjectForStorage;
  };

  const dispatchResumeGame = (savedGame: GameState | null) => {
    const game = gameRef.current;
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

  const dispatchPauseGame = () => {
    dispatch(pauseGameAction());
  };

  const dispatchMoveGame = (direction: Direction): GameState | void => {
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
    return gameObjectForStorage;
  };

  const dispatchResetGame = (): GameState => {
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
    return gameObjectForStorage;
  };

  const dispatchEndGame = () => {
    dispatch(endGameAction());
  };

  return {
    dispatchStartNewGame,
    dispatchResumeGame,
    dispatchPauseGame,
    dispatchMoveGame,
    dispatchResetGame,
    dispatchEndGame,
  };
};
