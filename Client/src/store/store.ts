import { configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './slices/game/game.slice';
import { appReducer } from './slices/app/app.slice';
import { modalReducer } from './slices/modal/modal.slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    game: gameReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
