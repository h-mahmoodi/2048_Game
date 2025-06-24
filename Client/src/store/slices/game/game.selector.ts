import type { RootState } from '@/store/store';

export const gameSliceSelectors = {
  selectBoard: (state: RootState) => state.game.board,
  selectScore: (state: RootState) => state.game.score,
  selectBestScore: (state: RootState) => state.game.bestScore,
  selectSize: (state: RootState) => state.game.size,
  selectStatus: (state: RootState) => state.game.status,
  selectGame: (state: RootState) => state.game,
};
export type GameSliceSelectors = typeof gameSliceSelectors;
