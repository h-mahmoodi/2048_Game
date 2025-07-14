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
import { useEffect, useRef } from 'react';
import {
  buildGameState,
  createGameInstance,
  resumeGameInstanse,
} from '@/services/game/game.service';

export const gameEngineActions = () => {
  const { board, size, status, bestScore } = useAppSelector(
    gameSelector.game
  );
  const dispatch = useAppDispatch();
  const gameRef = useRef<GameEngine>(createGameInstance(size));

  useEffect(() => {
    gameRef.current = createGameInstance(size);
  }, [size]);

  const dispatchStartNewGame = (): GameState => {
    const game = createGameInstance(size);

    dispatch(
      startGameAction({
        board: game.getBoard(),
        score: 0,
      })
    );

    return buildGameState(game, bestScore, size, GameStateStatus.PLAYING);
  };

  const dispatchResumeGame = (savedGame: GameState | null) => {
    const game = gameRef.current;
    if (savedGame) {
      resumeGameInstanse(game, savedGame.board);

      dispatch(
        startGameAction({
          board: savedGame.board,
          score: savedGame.score,
          bestScore: savedGame.bestScore,
        })
      );
    } else {
      resumeGameInstanse(game, board);

      dispatch(
        startGameAction({
          board: game.getBoard(),
          score: game.getScore(),
        })
      );
    }
  };

  const dispatchPauseGame = () => {
    dispatch(pauseGameAction());
  };

  const dispatchMoveGame = (direction: Direction): GameState | void => {
    if (status !== GameStateStatus.PLAYING) return;
    const game = gameRef.current;
    resumeGameInstanse(game, board);
    const prevBoard = game.getBoard();
    game.move(direction);
    if (!game.hasChanged(prevBoard)) return;

    game.insertRandomTile();

    const newStatus = game.isGameOver()
      ? GameStateStatus.GAMEOVER
      : GameStateStatus.PLAYING;

    dispatch(
      updateBoardAction({
        board: game.getBoard(),
        score: game.getScore(),
        status: newStatus,
      })
    );
    return buildGameState(game, bestScore, size, newStatus);
  };

  const dispatchResetGame = (): GameState => {
    const game = createGameInstance(size);

    dispatch(
      resetGameAction({
        board: game.getBoard(),
      })
    );
    return buildGameState(game, 0, size, GameStateStatus.PLAYING);
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
