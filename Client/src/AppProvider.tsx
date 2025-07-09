import { ThemeProvider } from 'react-jss';
import { themes } from './theme/theme';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useAppSelector } from './hooks';
import { themeSelector } from './store/slices/app/app.selector';

const AppProvider = () => {
  const theme = useAppSelector(themeSelector);
  return (
    <ThemeProvider theme={theme === 'light' ? themes.light : themes.dark}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default AppProvider;
