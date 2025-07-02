import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { themeSelector } from '@/store/slices/app/app.selector';
import { setTheme } from '@/store/slices/app/app.slice';
import type { Theme } from '@/types/theme.type';
import { createUseStyles } from 'react-jss';
import { Outlet } from 'react-router';

const useStyle = createUseStyles((theme: Theme) => ({
  Main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: () => theme.background,
  },
  Container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: () => theme.boardBackground,
  },
}));

export const AppLayout = () => {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(themeSelector);

  const switchThemeHandler = () => {
    console.log(theme);
    dispatch(setTheme({ theme: theme === 'light' ? 'dark' : 'light' }));
  };
  return (
    <div className={classes.Main}>
      <div>
        <button onClick={switchThemeHandler}>Switch theme</button>
      </div>
      <div className={classes.Container}>
        <Outlet />
      </div>
    </div>
  );
};
