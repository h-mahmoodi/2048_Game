import type { ThemeName } from '@/types/theme.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  theme: ThemeName;
};

const initialState: InitialState = {
  theme: 'light',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (
      state: InitialState,
      action: PayloadAction<{ theme: ThemeName }>
    ) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { setTheme } = appSlice.actions;
export const appReducer = appSlice.reducer;
