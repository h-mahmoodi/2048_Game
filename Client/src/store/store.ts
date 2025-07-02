import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './slices/game/game.slice';
import { appReducer } from './slices/app/app.slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
