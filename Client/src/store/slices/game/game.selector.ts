import type { RootState } from '@/store/store';

export const gameSelector = {
  board: (state: RootState) => state.game.board,
  score: (state: RootState) => state.game.score,
  bestScore: (state: RootState) => state.game.bestScore,
  size: (state: RootState) => state.game.size,
  status: (state: RootState) => state.game.status,
  game: (state: RootState) => state.game,
} as const;
export type GameSelectors = typeof gameSelector;
