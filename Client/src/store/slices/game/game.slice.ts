import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  GameStateStatus,
  type GameState,
  type Tile,
} from '@/types/game.type';
import { createInitialBoard, getScoreFromBoard } from '@/utils/game.utils';

const initialBoardSize = 4;

const initialTilesCount = Math.floor(Math.random() * initialBoardSize) + 1;

const initialState: GameState = {
  board: createInitialBoard(initialBoardSize),
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
    startGame: (state: GameState) => {
      const newBoard = createInitialBoard(state.size);
      state.board = newBoard;
      state.score = 0;
      state.status = GameStateStatus.PLAYING;
      state.timer = Date.now();
    },
    updateBoard: (
      state: GameState,
      action: PayloadAction<{ board: Tile[][] }>
    ) => {
      const newScore = getScoreFromBoard(action.payload.board);
      state.board = action.payload.board;
      state.score = newScore;
      state.bestScore = Math.max(state.bestScore, newScore);
    },
    resetGame: (state: GameState) => {
      const newBoard = createInitialBoard(initialState.size);
      state.board = newBoard;
      state.score = 0;
      state.bestScore = 0;
      state.status = GameStateStatus.PLAYING;
      state.timer = Date.now();
    },
    endGame: (state: GameState) => {
      state.status = GameStateStatus.GAMEOVER;
    },
  },
});

export const { resetGame, startGame, endGame, updateBoard } =
  gameSlice.actions;
export const gameReducer = gameSlice.reducer;
