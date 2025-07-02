import type { darkTheme, lightTheme, themes } from '@/theme/theme';

export type Theme = typeof lightTheme | typeof darkTheme;
export type ThemeName = keyof typeof themes;

export type THHHH = {
  [K in Uppercase<ThemeName>]: K extends Uppercase<ThemeName>
    ? Lowercase<K>
    : never;
};
