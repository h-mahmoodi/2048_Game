const lightTheme = {
  background: '#ffffff',
  tileColor: '#ccc',
  textColor: '#000',
};

const darkTheme = {
  background: '#121212',
  tileColor: '#444',
  textColor: '#fff',
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type Theme = typeof lightTheme | typeof darkTheme;
export type ThemeName = keyof typeof themes;
