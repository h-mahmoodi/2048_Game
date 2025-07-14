import { GameEngine } from '@/engine/GameEngine';
import type { GameState, GameStateStatus, Tile } from '@/types/game.type';

export const createGameInstance = (size: number) => {
  const game = new GameEngine(size);
  game.start();
  return game;
};

export const resumeGameInstanse = (
  game: GameEngine,
  board: GameState['board']
) => {
  game.start(board);
};

export const buildGameState = (
  game: GameEngine,
  bestScore: number,
  size: number,
  status: GameStateStatus
): GameState => ({
  board: game.getBoard(),
  score: game.getScore(),
  bestScore: Math.max(bestScore, game.getScore()),
  size,
  status,
  timer: Date.now(),
});
