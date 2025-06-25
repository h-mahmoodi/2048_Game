import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { GameStateStatus, type GameState } from '@/types/game.type';
import { generateInitialTiles } from '@/utils';

const initialBoardSize = 4;

const initialTilesCount = Math.floor(initialBoardSize / 4);

const initialState: GameState = {
  board: [],
  score: 0,
  bestScore: 0,
  size: initialBoardSize,
  status: GameStateStatus.IDLE,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state: GameState) => {
      state.board = generateInitialTiles(
        initialBoardSize,
        initialTilesCount
      );
      state.status = GameStateStatus.PLAYING;
    },
    updateBoard: (state: GameState, action: PayloadAction<GameState>) => {
      state.board = action.payload.board;
      state.score = action.payload.score;
      state.bestScore = Math.max(state.bestScore, action.payload.score);
    },
    resetGame: (state: GameState) => {
      state.board = generateInitialTiles(
        initialBoardSize,
        initialTilesCount
      );
      state.score = 0;
      state.bestScore = 0;
      state.size = initialBoardSize;
      state.status = GameStateStatus.PLAYING;
    },
    endGame: (state: GameState) => {
      state.status = GameStateStatus.GAMEOVER;
    },
  },
});

export const { resetGame, startGame, endGame, updateBoard } =
  gameSlice.actions;
export const gameReducer = gameSlice.reducer;
