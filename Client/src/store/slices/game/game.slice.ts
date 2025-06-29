import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  GameStateStatus,
  type GameState,
  type Tile,
} from '@/types/game.type';

const initialBoardSize = 4;

const initialState: GameState = {
  board: [],
  score: 0,
  bestScore: 0,
  size: initialBoardSize,
  status: GameStateStatus.IDLE,
  timer: Date.now(),
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (
      state: GameState,
      action: PayloadAction<{ board: Tile[][]; score: number }>
    ) => {
      state.board = action.payload.board;
      state.score = action.payload.score;
      state.status = GameStateStatus.PLAYING;
      state.timer = Date.now();
    },
    pauseGame: (state: GameState) => {
      state.status = GameStateStatus.PAUSE;
    },
    updateBoard: (
      state: GameState,
      action: PayloadAction<{
        board: Tile[][];
        score: number;
        isGameOver: boolean;
      }>
    ) => {
      state.board = action.payload.board;
      state.score = action.payload.score;
      state.bestScore = Math.max(state.bestScore, action.payload.score);
      if (action.payload.isGameOver) {
        state.status = GameStateStatus.GAMEOVER;
      }
    },
    resetGame: (
      state: GameState,
      action: PayloadAction<{ board: Tile[][] }>
    ) => {
      state.board = action.payload.board;
      state.score = 0;
      state.status = GameStateStatus.PLAYING;
      state.timer = Date.now();
    },
    endGame: (state: GameState) => {
      state.status = GameStateStatus.GAMEOVER;
    },
  },
});

export const { resetGame, startGame, endGame, updateBoard, pauseGame } =
  gameSlice.actions;
export const gameReducer = gameSlice.reducer;
