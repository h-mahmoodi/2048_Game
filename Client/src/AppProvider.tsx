import { ThemeProvider } from 'react-jss';
import { themes } from './theme/theme';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import { type Theme } from './types/theme.type';

const AppProvider = () => {
  const [isDark] = useState(false);
  const theme: Theme = isDark ? themes.dark : themes.light;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
