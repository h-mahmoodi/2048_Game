import type { RootState } from '@/store/store';

export const themeSelector = (state: RootState) => state.app.theme;
