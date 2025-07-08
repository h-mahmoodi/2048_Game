import { themeSelector } from '@/store/slices/app/app.selector';
import { useAppSelector } from '../useRedux/useRedux';
import { useDispatch } from 'react-redux';
import type { ThemeName } from '@/types/theme.type';
import { setTheme } from '@/store/slices/app/app.slice';

export const useTheme = () => {
  const theme = useAppSelector(themeSelector);
  const dispatch = useDispatch();

  const changeTheme = (theme: ThemeName) => {
    dispatch(setTheme({ theme }));
  };

  const toggleTheme = () => {
    dispatch(setTheme({ theme: theme === 'dark' ? 'light' : 'dark' }));
  };

  return {
    changeTheme,
    toggleTheme,
  };
};
