import { ThemeProvider } from 'react-jss';
import { themes } from './theme/theme';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { type Theme } from './types/theme.type';
import { RouterProvider } from 'react-router';
import { router } from './routes';

const AppProvider = () => {
  const [isDark] = useState(false);
  const theme: Theme = isDark ? themes.dark : themes.light;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default AppProvider;
