import { themeSelector } from '@/store/slices/app/app.selector';
import { useAppSelector } from '../useRedux/useRedux';
import { useDispatch } from 'react-redux';
import type { ThemeName } from '@/types/theme.type';
import { setThemeAction } from '@/store/slices/app/app.slice';

export const useTheme = () => {
  const theme = useAppSelector(themeSelector);
  const dispatch = useDispatch();

  const changeTheme = (theme: ThemeName) => {
    dispatch(setThemeAction({ theme }));
  };

  const toggleTheme = () => {
    dispatch(
      setThemeAction({ theme: theme === 'dark' ? 'light' : 'dark' })
    );
  };

  return {
    theme,
    changeTheme,
    toggleTheme,
  };
};
