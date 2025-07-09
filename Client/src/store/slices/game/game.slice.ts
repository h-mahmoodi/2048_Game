import { createInitialBoard } from '@/utils/game.utils';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  GameStateStatus,
  type GameState,
  type Tile,
} from '@/types/game.type';

const initialBoardSize = 4;
const initialBoard = createInitialBoard(initialBoardSize);

export const initialGameState: GameState = {
  board: initialBoard,
  score: 0,
  bestScore: 0,
  size: initialBoardSize,
  status: GameStateStatus.IDLE,
  timer: Date.now(),
};

const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    startGameAction: (
      state: GameState,
      action: PayloadAction<{
        board: Tile[][];
        score: number;
        bestScore?: number;
      }>
    ) => {
      state.board = action.payload.board;
      state.score = action.payload.score;
      state.bestScore = action.payload.bestScore
        ? action.payload.bestScore
        : state.bestScore;
      state.status = GameStateStatus.PLAYING;
      state.timer = Date.now();
    },
    pauseGameAction: (state: GameState) => {
      state.status = GameStateStatus.PAUSE;
    },
    updateBoardAction: (
      state: GameState,
      action: PayloadAction<{
        board: Tile[][];
        score: number;
        status: GameStateStatus;
      }>
    ) => {
      state.board = action.payload.board;
      state.score = action.payload.score;
      state.bestScore = Math.max(state.bestScore, action.payload.score);
      state.status = action.payload.status;
    },
    resetGameAction: (
      state: GameState,
      action: PayloadAction<{ board: Tile[][] }>
    ) => {
      state.board = action.payload.board;
      state.score = 0;
      state.status = GameStateStatus.PLAYING;
      state.timer = Date.now();
    },
    endGameAction: (state: GameState) => {
      state.status = GameStateStatus.IDLE;
    },
    changeGameStatusAction: (
      state: GameState,
      action: PayloadAction<{ status: GameStateStatus }>
    ) => {
      state.status = action.payload.status;
    },
  },
});

export const {
  resetGameAction,
  startGameAction,
  endGameAction,
  updateBoardAction,
  pauseGameAction,
  changeGameStatusAction,
} = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
