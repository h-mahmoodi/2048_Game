import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { GameStateStatus, type GameState } from '@/types/game.type';

const initialState: GameState = {
  board: [],
  score: 0,
  bestScore: 0,
  size: 4,
  status: GameStateStatus.IDLE,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGame: (state: GameState) => {
      state.board = [];
      state.score = 0;
      state.bestScore = 0;
      state.size = 4;
      state.status = GameStateStatus.IDLE;
    },
    startGame: (state: GameState) => {
      state.status = GameStateStatus.PLAYING;
    },
    endGame: (state: GameState) => {
      state.status = GameStateStatus.GAMEOVER;
    },
    updateBoard: (state: GameState, action: PayloadAction<GameState>) => {
      state.board = action.payload.board;
      state.score = action.payload.score;
      state.bestScore = Math.max(state.bestScore, action.payload.score);
    },
  },
});

export const { resetGame, startGame, endGame, updateBoard } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
