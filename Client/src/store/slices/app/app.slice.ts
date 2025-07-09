import type { ThemeName } from '@/types/theme.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  theme: ThemeName;
};

const initialState: InitialState = {
  theme: 'dark',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setThemeAction: (
      state: InitialState,
      action: PayloadAction<{ theme: ThemeName }>
    ) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { setThemeAction } = appSlice.actions;
export const appReducer = appSlice.reducer;
