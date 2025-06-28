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
      state.status = GameStateStatus.PLAYING;
    },
    updateBoard: (
      state: GameState,
      action: PayloadAction<{ board: Tile[][] }>
    ) => {
      const oldScore = getScoreFromBoard(state.board);
      state.board = action.payload.board;
      state.score = getScoreFromBoard(action.payload.board);
      state.bestScore = Math.max(state.bestScore, oldScore);
    },
    resetGame: (state: GameState) => {},
    endGame: (state: GameState) => {
      state.status = GameStateStatus.GAMEOVER;
    },
  },
});

export const { resetGame, startGame, endGame, updateBoard } =
  gameSlice.actions;
export const gameReducer = gameSlice.reducer;
